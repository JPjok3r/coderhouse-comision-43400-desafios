import { getAll, getById } from "../services/products.service.js";
import { getCartById } from "../services/carts.service.js";

export const chat = (req, res) => {
    res.render('chat', { titlePage: "Chat" });
}

export const homeProducts = async (req, res) => {
    try {
        const products = await getAll({...req.query,lean:true});
        res.status(200).render('products', {products, titlePage: "Productos", user:req.session.user});
    } catch (error) {
        res.status(500).json({error});
    }
}

export const productById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getById(id);
        let prod = product.toObject();
        res.status(200).render('productDetails', {prod, titlePage: "Detalle de Producto"});
    } catch (error) {
        res.status(500).json({error});
    }
}

export const carritoView = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await getCartById(id);
        let doc = cart.toObject();
        res.status(200).render('cartDetail', {doc, titlePage: "Carrito"});
    } catch (error) {
        res.status(500).json({error});
    }
}

export const loginView = (req, res) => {
    res.render('login', {layout:'accounts', titlePage: 'Login' })
}

export const signupView = (req, res) => {
    res.render('signup', { layout:"accounts" , titlePage :'Registro' });
}