import { Router } from "express";
import { usersMongo } from "../dao/mongoManagers/UsersMongo.js";
import { hashData, compareData } from "../utils.js";
import passport from "passport";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Debe llenar los datos"});
    }
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
        req.session.user = {
            name: "CoderHouse",
            email: email,
            rol: "Admin"
        }
        res.redirect('/products')
    } else{
        const user = await usersMongo.findOne(email)
        if(!user){
            return res.status(400).json({ message: 'Usuario no existe, debe registrarse' });
        }
        if(!await compareData(password, user.password)){
            return res.status(401).json({ message: 'Email or Password no validos' });
        }
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: email,
            rol: user.rol,
            age: user.age,
            cart: user.cart
        }
        res.redirect('/products')

    }
});

router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if(!email || !password || !first_name || !last_name || !age){
        return res.status(400).json({message: "Debe llenar los datos"});
    }
    const user = await usersMongo.findOne(email)
    if(user){
        return res.status(400).json({ message: 'El correo ya se encuentra registrado' });
    }
    const hashPassword = await hashData(password);
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    };
    const cartUser = await (await fetch('http://localhost:8080/api/carts', settings)).json();
     const newUser = await usersMongo.createUser({
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: parseInt(age),
        password: hashPassword,
        cart: cartUser.cart._id
    });
    res.status(200).json({message: 'Usuario creado', user:newUser});
});

router.get('/loginWithGithub', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github', passport.authenticate('github', { failureRedirect:'/' }), (req,res) => {
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        rol: req.user.rol,
        cart: req.user.cart
    }
    res.redirect('/products')
});

router.get('/loginWithGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/googleAuth', passport.authenticate('google', { failureRedirect:'/' }), (req,res) => {
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        rol: req.user.rol,
        cart: req.user.cart
    } 
    res.redirect('/products')
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).json({message: err})
        res.redirect('/')
    })
});

export default router;