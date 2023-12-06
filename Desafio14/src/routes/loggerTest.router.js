import { Router } from 'express';
import { loggerTest } from "../controllers/loggerTest.controller.js";

const router = Router();

router.get('/', loggerTest);

export default router;