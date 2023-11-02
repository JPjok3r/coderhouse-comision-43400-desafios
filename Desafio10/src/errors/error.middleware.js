import errorsEn from './enums.js';

export const errorMiddleware = (error, req, res, next) => {
    console.log(error.cause);
    switch(error.code){
        case errorsEn.INVALID_PARAMETERS:
            res.send({status: "error", error: error.name});
            break;
        default:
            res.send({status: "error", error: "Error no controlado"});
            break;
    }
}