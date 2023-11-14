import { userService } from "../services/users.service.js";
import config from "../config.js";
import { el } from "@faker-js/faker";

class UserController{
    async login(req, res) {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Debe llenar los datos"});
        }
        if(email === config.admin_mail && password === config.admin_password){
            req.session.user = {
                name: "CoderHouse",
                email: email,
                rol: "Admin"
            }
            res.redirect('/products');
        } else{
            const verifyUser = await userService.getOne(email, password);
            if(verifyUser.userValid){
                if(verifyUser.authorized){
                    req.session.user = {
                        name: `${verifyUser.user.first_name} ${verifyUser.user.last_name}`,
                        email: email,
                        rol: verifyUser.user.rol,
                        age: verifyUser.user.age,
                        cart: verifyUser.user.cart
                    }
                    res.redirect('/products');
                } else{
                    res.status(401).json({ message: 'Email or Password no validos' });
                }
            } else{
                res.status(400).json({ message: verifyUser.msg });
            }
        }
    }
    
    async signup(req, res) {
        const { first_name, last_name, email, age, password } = req.body;
        if(!email || !password || !first_name || !last_name || !age){
            return res.status(400).json({message: "Debe llenar los datos"});
        }
        const response = await userService.create(req.body);
        if (response.operationFail){
            return res.status(400).json({ message: response.msg });
        }
        res.status(200).json({message: 'Usuario creado', user:response});
    }

    async recoverPass(req, res){
        const { email } = req.body;
        if (!email){
            return res.status(400).json({message: "Debe ingresar el correo electronico"});
        }
        const response = await userService.passRecover(email);
        if (response.operationFail){
            return res.status(400).json({ message: response.msg });
        }
        res.status(200).json({message: response.msg, user: response.updUser});
    }

    async resetPass(req, res){
        const { password } = req.body;
        const { id } = req.params;
        if (!password){
            return res.status(400).json({message: "Debe ingresar la contraseña"});
        }
        const userResetPass = await userService.updateUser(id, {password}, true);
        if(userResetPass){
            res.status(200).json({message: 'Contraseña actualizada correctamente', user: userResetPass});
        } else{
            res.status(500).json({message: 'Error al actualizar la contraseña'});
        }
    }

    async changeUserRole(req, res){
        const { uid } = req.params;
        const user = await userService.getById(uid);
        if(user.user.role === "user"){
            const updUser = await userService.updateUser(uid, {role: 'premium'});
            res.status(200).json({message: 'Usted ahora es usario premium', user: updUser});
        } else{
            const updUser = await userService.updateUser(uid, {role: 'user'});
            res.status(200).json({message: 'Usted ahora es un usuario común', user: updUser});
        }
    }
    
    githubAuth(req, res) {
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            rol: req.user.rol,
            cart: req.user.cart
        }
        res.redirect('/products');
    }
    
    googleAuth(req, res) {
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            rol: req.user.rol,
            cart: req.user.cart
        } 
        res.redirect('/products');
    }
    
    logout(req, res) {
        req.session.destroy(err => {
            if(err) return res.status(500).json({message: err})
            res.redirect('/');
        });
    }
}

export const userController = new UserController();