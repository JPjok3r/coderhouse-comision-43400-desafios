
export const currentSession = (req, res) => {
    if(!req.session.user){
        res.status(401).json({message: 'No existe una sesion, debe autenticarse.'});
    } else{
        res.status(200).json({message: 'Bienvenido.', user: req.session.user});
    }
}