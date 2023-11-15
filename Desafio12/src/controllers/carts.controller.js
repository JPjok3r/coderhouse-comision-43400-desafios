import { cartService } from "../services/carts.service.js";
import { productService } from "../services/products.service.js";
import { ticketService } from "../services/tickets.service.js";
class CartController{
    async getCart(req, res) {
        const { cid } = req.params;
        try {
            const cart = await cartService.getCartById(cid);
            if(cart){
                res.status(200).json({ message: `Carrito con identificador: ${cid}`, carrito: cart });
            }
            else{
                res.status(200).json({ message: cart });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    
    async createCart(req, res) {
        try {
            const newCart = await cartService.createCarrito();
            res.status(200).json({ message:"Cart creado", cart: newCart });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    
    async addProdToCart(req, res) {
        const { pid, cid } = req.params;
        const { cant } = req.body;
        try {
            const product = await productService.getById(pid);
            const cart = await cartService.getCartById(cid);
            if(product && cart){
                if(req.session.user.rol === 'premium'){
                    if(product.owner === req.session.user.email){
                        return res.status(401).json({ message: 'Usted no puede agregar este producto', product});
                    }
                }
                const msg = await cartService.addProductToCart(cid, pid, cant);
                res.status(200).json({ message: msg});
            } else{
                res.status(200).json({ message: "Carrito o producto inexistentes, no es posible realizar la operacion." });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    
    async delProdInCart(req, res) {
        const { pid, cid } = req.params;
        try {
            const prodDeleted = await cartService.deleteProdFromCart(cid, pid);
            res.status(200).json({ message: prodDeleted });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    
    async delCart(req, res) {
        const { cid } = req.params;
        try {
            const cartDeleted = await cartService.deleteCart(cid);
            if (!cartDeleted )
                return res.status(200).json({ message: 'Carrito no encontrado' });
            res.status(200).json({ message: cartDeleted });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async purchase(req, res) {
        const { cid } = req.params;
        try {
            const cart = await cartService.getCartById(cid);
            let productsNoAv = [];
            let amount = 0;
            let userEmail = req.session.user.email;
            cart.products.forEach(async prod => {
                if(prod.id.stock < prod.quantity){
                    productsNoAv.push(prod.id._id);
                } else{
                    amount += prod.id.price * prod.quantity;
                    await cartService.deleteProdFromCart(cid, prod.id._id);
                    await productService.update(prod.id._id, {stock:prod.id.stock-prod.quantity});
                }
            });
            const nticket = await ticketService.createTicket(amount, userEmail);
            if(amount > 0 && nticket){
                if(productsNoAv.length !== 0){
                    res.status(200).json({ticket:nticket, productsUnavailable: productsNoAv});
                } else{
                    res.status(200).json({ticket:nticket});
                }
            } else{
                res.status(200).json({productsUnavailable: productsNoAv});
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

export const cartController = new CartController();
