import { Router } from "express";
import { usersMongo } from "../dao/mongoManagers/UsersMongo.js";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Debe llenar los datos"});
    }
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
        req.session.user = {
            name: "Coder",
            email: email,
            rol: "admin"
        }
        res.redirect('/products')
    } else{
        const user = await usersMongo.findOne(email)
        if(!user){
            return res.status(400).json({ message: 'Usuario no existe, debe registrarse' });
        }
        if(password !== user.password){
            return res.status(401).json({ message: 'Email or Password no validos' });
        }
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: email,
            rol: user.rol,
            age: user.age
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
    const newUser = await usersMongo.createUser({
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: parseInt(age),
        password: password
    });
    res.status(200).json({message: 'Usuario creado', user:newUser});
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).json({message: err})
        res.redirect('/')
    })
});

export default router;