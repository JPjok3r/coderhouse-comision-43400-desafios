import { sessionService } from "../services/session.service.js";

export const currentSession = async (req, res) => {
    if(!req.session.user){
        res.status(401).json({message: 'No existe una sesion, debe autenticarse.'});
    } else{
        const userVerify = await sessionService.currentSession(req.session.user.email);
        res.status(200).json({message: 'Bienvenido.', user: userVerify});
    }
}