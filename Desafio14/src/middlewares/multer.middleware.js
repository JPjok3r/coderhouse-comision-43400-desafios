import multer from 'multer';
import { __dirname } from '../utils/utils.js';
import { sessionService } from '../services/session.service.js';

const storageProfiles = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/uploads/profiles');
    },  
    filename: async function(req, file, cb){
        const user = req.session.user.email;
        const currentUser = await sessionService.currentSession(user);
        const nameFile = file.fieldname + '-' + currentUser.id;
        cb(null, nameFile);
    }
});

const storageProducts = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/uploads/products');
    },  
    filename: async function(req, file, cb){
        const user = req.session.user.email;
        const currentUser = await sessionService.currentSession(user);
        const nameFile = file.fieldname + '-' + currentUser.id;
        cb(null, nameFile);
    }
});

const storageDocuments = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/uploads/documents');
    },  
    filename: async function(req, file, cb){
        const user = req.session.user.email;
        const currentUser = await sessionService.currentSession(user);
        const originNameFile = file.originalname.split('.')
        const newFileName = originNameFile[0].replace(' ', '').toLowerCase();
        const nameFile = newFileName + '-' + currentUser.id;
        cb(null, nameFile);
        
        
    }
});

export const uploadProfile = multer({storage: storageProfiles});
export const uploadProduct = multer({storage: storageProducts});
export const uploadDocument = multer({storage: storageDocuments});