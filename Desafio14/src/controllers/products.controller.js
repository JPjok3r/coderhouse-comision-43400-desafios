import { productService } from "../services/products.service.js";
import CustomError from "../errors/CustomError.js";
import { generateProductErrorInfo } from "../errors/infoError.js";
import errorsEn from "../errors/enums.js";
import { logger } from "../winston.js";

class ProductController{
    async getProducts(req, res) {
        try {
            const products = await productService.getAll(req.query);
            logger.http('Estado correcto, codigo 200');
            logger.debug('Ejecucion valida');
            res.status(200).json({products});
        } catch (error) {
            logger.error(error.message);
            logger.http('Estado incorrecto, codigo 500');
            res.status(500).json({error});
        }
    }
    
    async getProductById(req, res) {
        const { pId } = req.params;
        try {
            const product = await productService.getById(pId);
            if(product){
                logger.http('Estado correcto, codigo 200');
                logger.debug('Ejecucion valida');
                res.status(200).json({ message: `Product ${pId}`, product});
            } else{
                logger.http('Estado correcto, codigo 200');
                logger.debug('Ejecucion fallida');
                logger.warning('Datos faltantes de la base de datos')
                res.status(200).json({ message: `Error`, product});
            }
        } catch (error) {
            logger.error(error.message);
            logger.http('Estado incorrecto, codigo 500');
            res.status(500).json({error});
        }
    }
    
    async createProduct(req, res, next) {
        const { title, description, code, price, status=true, stock, category, thumbnails=[] } = req.body;
        try {
            if(title && description && code && price && stock && category){
                let sendData = {
                    title,
                    description,
                    price,
                    code,
                    stock,
                    category,
                    status,
                    thumbnails
                }
                if(req.session.user.rol === 'premium'){
                    sendData = {...sendData, owner: req.session.user.email}
                } 
                const newProduct = await productService.create(sendData);
                logger.http('Estado correcto, codigo 200');
                logger.debug('Ejecucion valida');
                res.status(200).json({message: "Producto creado exitosamente", product: newProduct});
            } else{
                CustomError.createError({
                    name: "ProductError",
                    cause: generateProductErrorInfo({title, description, code, price, stock, category}),
                    message: "No se pudo crear el producto",
                    code: errorsEn.INVALID_PARAMETERS
                });
                logger.debug('Ejecucion no valida');
                logger.info('Datos faltantes desde front');
            }
        } catch (error) {
            logger.error(error.message);
            logger.http('Estado incorrecto, codigo 500');
            next(error);
        }
    }
    
    async updateProduct(req, res) {
        const { pId } = req.params;
        try {
            let product;
            if(req.session.user.rol === 'premium'){
                product = await productService.update(pId, req.body, req.session.user.email);
            } else{
                product = await productService.update(pId, req.body);
            }
            logger.http('Estado correcto, codigo 200');
            logger.debug('Ejecucion valida');
            res.status(200).json({ message: product});
        } catch (error) {
            logger.error(error.message);
            logger.info('Posible error en base de datos');
            logger.http('Estado incorrecto, codigo 500');
            res.status(500).json({error});
        }
    }
    
    async delProduct(req, res) {
        const { pId } = req.params;
        try {
            let response;
            if(req.session.user.rol === 'premium'){
                response = await productService.deleteProduct(pId, req.session.user.email);
            } else{
                response = await productService.deleteProduct(pId);
            }
            logger.http('Estado correcto, codigo 200');
            logger.debug('Ejecucion valida');
            res.status(200).json({ message: response });
        } catch (error) {
            logger.error(error.message);
            logger.info('Posible error en base de datos');
            logger.http('Estado incorrecto, codigo 500');
            res.status(500).json({error});
        }
    }
}

export const productController = new ProductController();