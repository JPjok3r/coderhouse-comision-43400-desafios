import { Router } from "express";
import { isLogged } from "../middlewares/logged.middleware.js";
import { chat, homeProducts, productById, loginView, signupView, carritoView } from "../controllers/views.controller.js";

const router = Router();

router.get('/chat', chat);
router.get('/products', isLogged, homeProducts);
router.get('/products/:id', isLogged, productById);
router.get('/', loginView);
router.get('/signup', signupView);
router.get('/cart/:id', carritoView);

export default router;