import fs from 'fs';
import { __dirname } from "../../utils.js"

class CartManager{
    constructor(path){
        this.path = path
    }

    async getCarts(){
        try {
            if(fs.existsSync(this.path)){
                const cartValues = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(cartValues);
            } else{
                return [];
            }
        } catch (error) {
            return `No se puede leer el archivo debido a ${error}`;
        }
    }

    async createCart(){
        try {
            const arrCarts = await this.getCarts();
            let id = arrCarts.length ? arrCarts[arrCarts.length - 1].id + 1 : 1;
            let products = [];
            arrCarts.push({id,products});
            await fs.promises.writeFile(this.path, JSON.stringify(arrCarts));
            return 'Carrito creado con exito';
        } catch (error) {
            return error
        }
    }

    async getCartById(id){
        try {
            const arrCarts = await this.getCarts();
            const cartAux = arrCarts.find(c => c.id === id);
            if(cartAux){
                return cartAux
            } else{
                return `No existe un carrito con identificador: ${id}`; 
            }
        } catch (error) {
            return error;
        }
    }

    async addProductToCart(idCart, idProduct){
        try {
            const arrCarts = await this.getCarts();
            const cartModIdx = arrCarts.findIndex(c => c.id === idCart)
            if(cartModIdx === -1){
                return `Error. El carrito con identificador: ${idCart}, no existe`; 
            }
            if(arrCarts[cartModIdx].products.length){
                let idxAux = arrCarts[cartModIdx].products.findIndex(p=>p.product===idProduct);
                idxAux !== -1 ?  arrCarts[cartModIdx].products[idxAux].quantity++ : arrCarts[cartModIdx].products.push({product: idProduct, quantity: 1});
            } else{
                arrCarts[cartModIdx].products.push({product: idProduct, quantity: 1});
            }
            await fs.promises.writeFile(this.path, JSON.stringify(arrCarts));
            return 'Producto agregado a carrito';
        } catch (error) {
            return error;
        }
    }
}

const cartManager = new CartManager(__dirname + '/carrito.json');
export default cartManager;
