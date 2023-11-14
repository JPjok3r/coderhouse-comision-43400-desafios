import { usersMongo } from "../persistencia/DAO/managers/UsersMongo.js";
import { hashData, compareData } from "../utils.js";
import { cartService } from "./carts.service.js";
import  transporter  from "./mailer/nodemailer.js";
import config from "../config.js";

class UserService{
    async getOne(email, password){
        const user = await usersMongo.findOne(email);
        if(!user){
            return {userValid: false, msg: "Usuario no existe, debe registrarse"};
        }
        if(!await compareData(password, user.password)){
            return { userValid: true, authorized: false };
        } else{
            return { userValid: true, authorized: true, user };
        }
    }

    async getById(id){
        const user = await usersMongo.findById(id);
        if(!user){
            return {userfoud: false, msg: "Usuario no existe"};
        }
        return {userFound: true, user}
    }

    async updateUser(id, obj, passwd){
        const user = await usersMongo.findById(id);
        if(passwd){
            const { password } = obj;
            const newPass = await hashData(password);
            const modifyObj = {
                password: newPass,
                recoveryPass: false,
                recoveryPassControl: ''
            }
            const newUserPass = await usersMongo.update(user.email, modifyObj);
            return newUserPass;
        } else{
            const updUser = await usersMongo.update(user.email, obj);
            return updUser;
        }
    }
    
    async create(userObj){
        const verifyUser = await usersMongo.findOne(userObj.email);
        if(verifyUser){
            return { operationFail: true, msg: "El correo ingresado ya se encuantra registrado."};
        }
        const hashPassword = await hashData(userObj.password);
        const cartUser = await cartService.createCarrito();
        const newUser = {
            ...userObj,
            password: hashPassword,
            cart: cartUser._id
        }
        const result =  await usersMongo.createUser(newUser);
        return result;
    }

    async passRecover(email){
        const verUser = await usersMongo.findOne(email);
        if(!verUser){
            return { operationFail: true, msg: "El correo ingresado no existe."};
        }
        const recoverControls = {
            recoveryPass: true,
            recoveryPassControl: new Date(Date.now() + 300000) //creando el tiempo de validez para el link
        };
        console.log(verUser);
        const msgOpt = {
            from: 'E-commerce CodeHouse',
            to: email,
            subject: 'Reestablecer contraseña',
            template: 'emailPassReset',
            context: {
                userId: verUser._id
            }
        }
        await transporter.sendMail(msgOpt);
        const updUser = await usersMongo.update(email, recoverControls);
        return {updUser, msg: 'Se envió el correo de recuperación de contraseña, verifique su bandeja de entrada. El correo es valido durante 1 hora.'};
    }
}

export const userService = new UserService();