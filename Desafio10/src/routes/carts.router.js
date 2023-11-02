import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";
import { authUserMiddleware } from "../middlewares/logged.middleware.js";

const router = Router();

router.post('/', cartController.createCart);
router.get('/:cid', cartController.getCart);
router.put('/:cid/product/:pid', authUserMiddleware(["Admin"]), cartController.addProdToCart);
router.delete('/:cid/products/:pid', cartController.delProdInCart);
router.delete('/:cid', cartController.delCart);
router.get('/:cid/purchase', cartController.purchase);

export default router;