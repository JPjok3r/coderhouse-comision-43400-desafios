import { sessionService } from "../services/session.service.js";

export const isLogged = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/');
    }
    next();
}

//Este middleware deberia funcionar para cualquier caso tanto admin como user,
//pero como admin no vive en DB haremos otro.
export const authUserMiddleware = roles => {
    return async (req, res, next) => {
        if(!req.session.user){
            return res.status(401).json({message: 'No existe una sesion, debe autenticarse.'});
        } else{
            const userVerify = await sessionService.currentSession(req.session.user.email);
            if(!roles.includes(userVerify.role)){
                return res.status(401).json({message: 'No esta autorizado a ingresar en esta ruta.'});
            }
            next();
        }
    }
}

export const authAdminMiddleware = (req, res, next) => {
    if(!req.session.user){
        return res.status(401).json({message: 'No existe una sesion, debe autenticarse.'});
    } else{
        if(req.session.user.rol !== "Admin" || req.session.user.rol !== "premium"){
            return res.status(401).json({message: 'No esta autorizado a ingresar en esta ruta.'});
        }
        next();
    }
}