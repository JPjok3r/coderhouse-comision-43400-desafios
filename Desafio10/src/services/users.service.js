import { usersMongo } from "../persistencia/DAO/managers/UsersMongo.js";
import { hashData, compareData } from "../utils.js";
import { cartService } from "./carts.service.js";

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
}

export const userService = new UserService();