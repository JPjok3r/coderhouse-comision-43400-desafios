import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/users.controller.js";
import { uploadDocument } from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/loginWithGithub', passport.authenticate('github', { scope: ['user:email'] }));
router.get("/github", passport.authenticate('github', { failureRedirect:'/' }), userController.githubAuth);
router.get('/loginWithGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/googleAuth", passport.authenticate('google', { failureRedirect:'/' }), userController.googleAuth);
router.get('/logout', userController.logout);
router.post('/recoverPass', userController.recoverPass);
router.post('/resetPass/:id', userController.resetPass);
router.delete('/:uid', userController.deleteUser);
router.put('/premium/:uid', userController.changeUserRole);
router.post('/:uid/documents', uploadDocument.array('documents', 3), userController.documentsUpload);

export default router;