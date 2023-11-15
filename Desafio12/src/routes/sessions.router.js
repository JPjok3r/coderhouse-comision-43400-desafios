import { Router } from "express";
import { currentSession } from "../controllers/sessions.controller.js";

const router = Router();

router.get('/current', currentSession);

export default router;