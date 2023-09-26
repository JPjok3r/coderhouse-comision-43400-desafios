import { Router } from "express";
import { productsMongo } from '../dao/mongoManagers/ProductsMongo.js';
import { cartsMongo } from "../dao/mongoManagers/CartsMongo.js";

const router = Router();

const isLogged = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/');
    }
    next();
}

router.get('/chat', (req, res) => {
    res.render('chat', {titlePage: "Chat"});
});

router.get('/products', isLogged, async (req, res) => {
    
    try {
        const products = await productsMongo.findAll({...req.query,lean:true});
        res.status(200).render('products', {products, titlePage: "Productos", user:req.session.user});
    } catch (error) {
        res.status(500).json({error});
    }
});

router.get('/products/:id', isLogged, async (req, res) => {
    
    const { id } = req.params;
    try {
        const product = await productsMongo.findById(id);
        let prod = product.toObject();
        res.status(200).render('productDetails', {prod, titlePage: "Detalle de Producto"});
    } catch (error) {
        res.status(500).json({error});
    }
});

/* router.post('/agregar/:cid/:pid', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({error});
    }
}); */

router.get('/cart/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await cartsMongo.findById(id);
        let doc = cart.toObject();
        res.status(200).render('cartDetail', {doc, titlePage: "Carrito"});
    } catch (error) {
        res.status(500).json({error});
    }
});

router.get('/', (req, res) => {
    res.render('login', {layout:'accounts', titlePage: 'Login' })
});

router.get('/signup', (req, res) => {
    res.render('signup', { layout:"accounts" , titlePage :'Registro' });
});

export default router;