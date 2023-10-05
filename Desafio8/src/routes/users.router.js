import { Router } from "express";
import passport from "passport";
import { login, signup, githubAuth, googleAuth, logout } from "../controllers/users.controller.js";

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/loginWithGithub', passport.authenticate('github', { scope: ['user:email'] }));
router.get("/github", passport.authenticate('github', { failureRedirect:'/' }), githubAuth);
router.get('/loginWithGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/googleAuth", passport.authenticate('google', { failureRedirect:'/' }), googleAuth);
router.get('/logout', logout);

export default router;