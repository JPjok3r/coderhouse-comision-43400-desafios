import { productsMongo } from "../persistencia/DAO/managers/ProductsMongo.js";

class ProductService{
    async getAll(obj) {
        const resProducts = await productsMongo.findAll(obj);
        return resProducts;
    }
    
    async getById(id) {
        const resProduct = await productsMongo.findById(id);
        return resProduct;
    }
    
    async create(obj) {
        const response = await productsMongo.createOne(obj);
        return response;
    }
    
    async update(id, obj) {
        const response = await productsMongo.updateOne(id, obj);
        return response;
    }
    
    async deleteProduct(id) {
        const response = await productsMongo.deleteOne(id);
        return response;
    }
}

export const productService = new ProductService();