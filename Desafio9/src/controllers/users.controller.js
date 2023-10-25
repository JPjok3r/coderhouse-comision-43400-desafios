import { userService } from "../services/users.service.js";
import config from "../config.js";

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