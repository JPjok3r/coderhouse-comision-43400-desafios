import { Router } from "express";
import { mockingProducts } from "../controllers/moking.controller.js";

const router = Router();

router.get('/', mockingProducts.getMockProducts);

export default router;