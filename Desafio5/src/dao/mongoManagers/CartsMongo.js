import { cartModel } from "../db/models/cart.model.js";

class CartsMongo{
    async findAll(){
        try {
            const carts = await cartModel.find({});
            return carts;
        } catch (error) {
            return error;
        }
    }

    async createCart(){
        try {
            const products = [];
            const newCart = await cartModel.create({products});
            return newCart;
        } catch (error) {
            return error;
        }
    }

    async findById(id){
        try {
            const cart = await cartModel.findById(id).populate('products.id');
            return cart;
        } catch (error) {
            return error;
        }
    }

    async existProductInCart(idCart, idProduct){
        try {
            const exists = await cartModel.findOne({ 
                $and: [
                    {_id:idCart},
                    {products: {$elemMatch: {id:idProduct}}}
                ]});
            if(exists)
                return true;
            else 
                return false;
        } catch (error) {
            return error;
        }
    }

    async addInCart(idCart, obj){
        try {
            const res = await cartModel.updateOne({_id:idCart},{$push:{products: obj}});
            return res;
        } catch (error) {
            return error;
        }
    }

    async addProductToCart(idCart, idProduct, cant=1){
        try {
            const cart = await this.findById(idCart);
            if(!cart){
                return "ID del carrito no existe";
            }
            let response;
            await this.existProductInCart(idCart, idProduct) 
            ? response = await cartModel.updateOne({_id:idCart},{$inc: {"products.$[elem].quantity":cant}},{arrayFilters:[{ "elem.id": idProduct}]})
            : response = await cartModel.updateOne({_id:idCart},{$push:{products: {id:idProduct, quantity:cant}}});

            return response;
        } catch (error) {
            return error;
        }
    }

    async deleteCart(id){
        try {
            const cart = await cartModel.findById(id);
            if(!cart)
                throw new Error('Carrito no encontrado');
            const resp = await cartModel.deleteOne({_id:id});
            return resp;
        } catch (error) {
            return error;
        }
    }

    async deleteProductFromCart(idCart, idProduct){
        try {
            const cart = await this.findById(idCart);
            if(!cart)
                throw new Error('Carrito no encontrado');
            const resp = await cartModel.updateOne({_id:idCart}, {$pull:{products:{id:idProduct}}});
            return resp;
        } catch (error) {
            return error;
        }
    }
}

export const cartsMongo = new CartsMongo();