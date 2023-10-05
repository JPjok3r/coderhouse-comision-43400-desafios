import { cartsMongo } from "../DAO/managers/CartsMongo.js";

export const getCartById = async (id) => {
    const cart = await cartsMongo.findById(id);
    return cart;
}

export const createCarrito = async () => {
    const cart = await cartsMongo.createCart();
    return cart;
}

export const addProductToCart = async (cid, pid, cant) => {
    const response = await cartsMongo.addProductToCart(cid, pid, cant);
    return response;
}

export const deleteProdFromCart = async (cid, pid) => {
    const response = await cartsMongo.deleteProductFromCart(cid, pid);
    return response;
}

export const deleteCart = async (id) => {
    const response = await cartsMongo.deleteCart(id);
    return response;
}