import { usersMongo } from "../DAO/managers/UsersMongo.js";
import { hashData, compareData } from "../utils.js";
import { createCarrito } from "./carts.service.js";

export const getOne = async (email, password) => {
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

export const create = async (userObj) => {
    const verifyUser = await usersMongo.findOne(userObj.email);
    if(verifyUser){
        return { operationFail: true, msg: "El correo ingresado ya se encuantra registrado."};
    }
    const hashPassword = await hashData(userObj.password);
    const cartUser = await createCarrito();
    const newUser = {
        ...userObj,
        password: hashPassword,
        cart: cartUser._id
    }
    const result =  await usersMongo.createUser(newUser);
    return result;
}