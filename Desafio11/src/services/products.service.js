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
    
    async update(id, obj, email) {
        if (email){
            const prodFinded = await this.getById(id);
            if(prodFinded.owner === email){
                const updatedProd = await productsMongo.updateOne(id, obj);
                return updatedProd;
            } else {
                return "Usted no tiene permiso de modificar este producto";
            }
        }
        const response = await productsMongo.updateOne(id, obj);
        return response;
    }
    
    async deleteProduct(id, email) {
        if (email){
            const prodFinded = await this.getById(id);
            if(prodFinded.owner === email){
                const deletedProd = await productsMongo.deleteOne(id);
                return deletedProd;
            } else {
                return "Usted no tiene permiso de eliminar este producto";
            }
        }
        const response = await productsMongo.deleteOne(id);
        return response;
    }
}

export const productService = new ProductService();