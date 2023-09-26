import { Router } from "express";
//import cartManager from '../dao/fileSystem/CartManager.js';
//import productManager from "../dao/fileSystem/ProductManager.js";

import { cartsMongo } from "../dao/mongoManagers/CartsMongo.js";
import { productsMongo } from "../dao/mongoManagers/ProductsMongo.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartsMongo.createCart();
        res.status(200).json({ message:"Cart creado", cart: newCart });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsMongo.findById(cid);
        if(cart){
            res.status(200).json({ message: `Carrito con identificador: ${cid}`, carrito: cart });
        }
        else{
            res.status(200).json({ message: cart });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/:cid/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartsMongo.existProductInCart(cid, pid);
        if(cart){
            res.status(200).json({ message: `Carrito con identificador: ${cid}`, carrito: cart });
        }
        else{
            res.status(200).json({ message: cart });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put('/:cid', async (req, res) => {
    const { id } = req.body;
    const { cid } = req.params;
    try {
        const cartExist = await cartsMongo.findById(cid);
        if(!cartExist){
            res.status(400).json({message: `El carrito con id: ${cid} no existe`})
        }
        const resp = await cartsMongo.addInCart(cid, req.body);
        res.status(200).json({message: resp});
    } catch (error) {
        res.status(500).json({error});
    }
});

/*Este endpoint realiza la misma operacion que el anterior PUT, hace las verificaciones
respectivas si el producto existe o no en el carrito y si no existe lo añade, si existe
solo actualiza su cantidad*/
router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { cant } = req.body;
    try {
        const productExist = await productsMongo.findById(pid);
         if(!productExist){
            res.status(200).json({ message: `Product ${pid}. El producto no existe. No se puede agregar el producto`});
        }
        else{ 
            const msg = await cartsMongo.addProductToCart(cid, pid, cant);
            res.status(200).json({ message: msg});
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const prodDeleted = await cartsMongo.deleteProductFromCart(cid, pid);
        res.status(200).json({ message: prodDeleted });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cartDeleted = await cartsMongo.deleteCart(cid);
        if (!cartDeleted )
            res.status(200).json({ message: 'Carrito no encontrado' });
        res.status(200).json({ message: cartDeleted });
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;