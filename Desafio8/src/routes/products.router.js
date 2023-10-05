import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, delProduct } from "../controllers/products.controller.js";

const router = Router();

router.get('/', getProducts);
router.get('/:pId', getProductById);
router.post('/', createProduct);
router.put('/:pId', updateProduct);
router.delete('/:pId', delProduct);

export default router;