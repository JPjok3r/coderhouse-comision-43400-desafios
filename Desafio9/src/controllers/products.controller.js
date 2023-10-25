import { productService } from "../services/products.service.js";
import CustomError from "../errors/CustomError.js";
import { generateProductErrorInfo } from "../errors/infoError.js";
import errorsEn from "../errors/enums.js";

class ProductController{
    async getProducts(req, res) {
        try {
            const products = await productService.getAll(req.query);
            res.status(200).json({products});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    
    async getProductById(req, res) {
        const { pId } = req.params;
        try {
            const product = await productService.getById(pId);
            if(product)
                res.status(200).json({ message: `Product ${pId}`, product});
            else
                res.status(200).json({ message: `Error`, product});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    
    async createProduct(req, res, next) {
        const { title, description, code, price, status=true, stock, category, thumbnails=[] } = req.body;
        try {
            if(title && description && code && price && stock && category){
                const sendData = {
                    title,
                    description,
                    price,
                    code,
                    stock,
                    category,
                    status,
                    thumbnails
                }
                const newProduct = await productService.create(sendData);
                res.status(200).json({message: "Producto creado exitosamente", product: newProduct});
            } else{
                CustomError.createError({
                    name: "ProductError",
                    cause: generateProductErrorInfo({title, description, code, price, stock, category}),
                    message: "No se pudo crear el producto",
                    code: errorsEn.INVALID_PARAMETERS
                });
            }
        } catch (error) {
            next(error);
        }
    }
    
    async updateProduct(req, res) {
        const { pId } = req.params;
        try {
            const product = await productService.update(pId, req.body);
            res.status(200).json({ message: product});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    
    async delProduct(req, res) {
        const { pId } = req.params;
        try {
            const response = await productService.deleteProduct(pId);
            res.status(200).json({ message: response });
        } catch (error) {
            res.status(500).json({error});
        }
    }
}

export const productController = new ProductController();