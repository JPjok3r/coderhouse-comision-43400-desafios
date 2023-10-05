import { Router } from "express";
import { getCart, createCart, addProdToCart, delCart, delProdInCart } from "../controllers/carts.controller.js";

const router = Router();

router.post('/', createCart);
router.get('/:cid', getCart);
router.put('/:cid/product/:pid', addProdToCart);
router.delete('/:cid/products/:pid', delProdInCart);
router.delete('/:cid', delCart);

export default router;