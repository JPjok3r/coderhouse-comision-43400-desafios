import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/users.controller.js";

const router = Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/loginWithGithub', passport.authenticate('github', { scope: ['user:email'] }));
router.get("/github", passport.authenticate('github', { failureRedirect:'/' }), userController.githubAuth);
router.get('/loginWithGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/googleAuth", passport.authenticate('google', { failureRedirect:'/' }), userController.googleAuth);
router.get('/logout', userController.logout);

export default router;