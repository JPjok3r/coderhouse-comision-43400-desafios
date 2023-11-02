import { cartsMongo } from "../persistencia/DAO/managers/CartsMongo.js";

class CartService{
    async getCartById(id) {
        const cart = await cartsMongo.findById(id);
        return cart;
    }
    
    async createCarrito() {
        const cart = await cartsMongo.createCart();
        return cart;
    }
    
    async addProductToCart(cid, pid, cant) {
        const response = await cartsMongo.addProductToCart(cid, pid, cant);
        return response;
    }
    
    async deleteProdFromCart(cid, pid) {
        const response = await cartsMongo.deleteProductFromCart(cid, pid);
        return response;
    }
    
    async deleteCart(id) {
        const response = await cartsMongo.deleteCart(id);
        return response;
    }
}

export const cartService = new CartService();