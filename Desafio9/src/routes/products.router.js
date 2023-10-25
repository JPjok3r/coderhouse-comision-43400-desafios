import { Router } from "express";
import { productController } from "../controllers/products.controller.js";
import { authAdminMiddleware } from "../middlewares/logged.middleware.js";

const router = Router();

router.get('/', productController.getProducts);
router.get('/:pId', productController.getProductById);
router.post('/', authAdminMiddleware, productController.createProduct);
router.put('/:pId', authAdminMiddleware, productController.updateProduct);
router.delete('/:pId', authAdminMiddleware, productController.delProduct);

export default router;