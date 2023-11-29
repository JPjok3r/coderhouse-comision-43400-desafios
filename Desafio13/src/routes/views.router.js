import { Router } from "express";
import { isLogged } from "../middlewares/logged.middleware.js";
import { viewController } from "../controllers/views.controller.js";
import { authUserMiddleware } from "../middlewares/logged.middleware.js";

const router = Router();

router.get('/chat', authUserMiddleware(["Admin"]), viewController.chat);
router.get('/products', isLogged, viewController.homeProducts);
router.get('/products/:id', isLogged, viewController.productById);
router.get('/', viewController.loginView);
router.get('/signup', viewController.signupView);
router.get('/cart/:id', authUserMiddleware(["Admin"]), viewController.carritoView);
router.get('/recoveryPassword', viewController.recoveryPass);
router.get('/recoverPass/:id', viewController.recoverPassMail);

export default router;