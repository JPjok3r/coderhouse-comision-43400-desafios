import { getCartById, createCarrito, addProductToCart, deleteProdFromCart, deleteCart } from "../services/carts.service.js";
import { getById } from "../services/products.service.js";

export const getCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await getCartById(cid);
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

export const createCart = async (req, res) => {
    try {
        const newCart = createCarrito();
        res.status(200).json({ message:"Cart creado", cart: newCart });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const addProdToCart = async (req, res) => {
    const { pid, cid } = req.params;
    const { cant } = req.body;
    try {
        const product = await getById(pid);
        const cart = await getCartById(cid);
        if(product && cart){
            const msg = addProductToCart(cid, pid, cant);
            res.status(200).json({ message: msg});
        } else{
            res.status(200).json({ message: "Carrito o producto inexistentes, no es posible realizar la operacion." });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const delProdInCart = async (req, res) => {
    const { pid, cid } = req.params;
    try {
        const prodDeleted = await deleteProdFromCart(cid, pid);
        res.status(200).json({ message: prodDeleted });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const delCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cartDeleted = await deleteCart(cid);
        if (!cartDeleted )
            res.status(200).json({ message: 'Carrito no encontrado' });
        res.status(200).json({ message: cartDeleted });
    } catch (error) {
        res.status(500).json({ error });
    }
}