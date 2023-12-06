import { productService } from "../services/products.service.js";
import { cartService } from "../services/carts.service.js";
import { userService } from "../services/users.service.js";
import { logger } from "../winston.js";

class ViewController{
    chat(req, res) {
        res.render('chat', { titlePage: "Chat" });
    }
    
    async homeProducts(req, res) {
        try {
            const products = await productService.getAll({...req.query,lean:true});
            res.status(200).render('products', {products, titlePage: "Productos", user:req.session.user});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    
    async productById(req, res) {
        const { id } = req.params;
        try {
            const product = await productService.getById(id);
            let prod = product.toObject();
            res.status(200).render('productDetails', {prod, titlePage: "Detalle de Producto"});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    
    async carritoView(req, res) {
        const { id } = req.params;
        try {
            const cart = await cartService.getCartById(id);
            let doc = cart.toObject();
            res.status(200).render('cartDetail', {doc, titlePage: "Carrito"});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    
    loginView(req, res) {
        res.render('login', {layout:'accounts', titlePage: 'Login' })
    }
    
    signupView(req, res) {
        res.render('signup', { layout:"accounts" , titlePage :'Registro' });
    }

    recoveryPass(req, res) {
        res.render('recoveryPass', { layout:"accounts" , titlePage :'Olvidé contraseña' });
    }

    async recoverPassMail(req, res){
        const {id} = req.params;
        const user = await userService.getById(id);
        if(!user.userFound){
            return res.status(500).json({message: user.msg})
        }
        let timeDb = new Date(user.user.recoveryPassControl);
        let timeNow = new Date(Date.now());
        let valid = false;
        if(timeDb.getHours() === 0 && timeNow.getHours() === 23){
            valid = true;
        } else if(timeNow.getHours() < timeDb.getHours()){
            valid = true;
        } else if(timeNow.getHours() === timeDb.getHours() && timeNow.getMinutes() <= timeDb.getMinutes()){
            valid = true;
        }
        if(valid){
            res.render('resetPassword', { layout: "accounts", titlePage: 'Resetear Contraseña', idUser: id });
        } else{
            res.render('recoveryPass', { layout:"accounts" , titlePage :'Olvidé contraseña', expired: 'El tiempo expiró, por favor ingrese su correo nuevamente para enviarle un nuevo correo de habilitación'});
        }
    }
}

export const viewController = new ViewController();