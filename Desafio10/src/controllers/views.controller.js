import { productService } from "../services/products.service.js";
import { cartService } from "../services/carts.service.js";

class ViewController{
    chat(req, res) {
        res.render('chat', { titlePage: "Chat" });
    }
    
    async homeProducts(req, res) {
        try {
            const products = await productService.getAll({...req.query,lean:true});
            res.status(200).render('products', {products, titlePage: "Productos", user:req.session.user});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    
    async productById(req, res) {
        const { id } = req.params;
        try {
            const product = await productService.getById(id);
            let prod = product.toObject();
            res.status(200).render('productDetails', {prod, titlePage: "Detalle de Producto"});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    
    async carritoView(req, res) {
        const { id } = req.params;
        try {
            const cart = await cartService.getCartById(id);
            let doc = cart.toObject();
            res.status(200).render('cartDetail', {doc, titlePage: "Carrito"});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    
    loginView(req, res) {
        res.render('login', {layout:'accounts', titlePage: 'Login' })
    }
    
    signupView(req, res) {
        res.render('signup', { layout:"accounts" , titlePage :'Registro' });
    }
}

export const viewController = new ViewController();