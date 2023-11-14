import { productModel } from "../db/models/product.model.js";

class ProductsMongo {

    /* async findAll(){
        try {
            const products = await productModel.find({});
            return products;
        } catch (error) {
            return error;
        }
    } */

    async findAll(obj){
        const { limit, page, sortPrice, lean, ...query } = obj;
        let options;
        if(limit){
            options = { limit, page, sort: { price:sortPrice}, lean}
        } else{
            options = { pagination: false, lean}
        }
        try {
            const rest = await productModel.paginate(query, options);
            const info = {
                status: rest
                    ? "success"
                    : "error",
                payload: rest.docs,
                totalPages: rest.totalPages,
                prevPage: rest.hasPrevPage
                    ? rest.prevPage
                    : null,
                nextPage: rest.hasNextPage
                    ? rest.nextPage
                    : null,
                hasPrevPage: rest.hasPrevPage,
                hasNextPage: rest.hasNextPage,
                prevLink: rest.hasPrevPage
                    ? `http://localhost:8080/api/products?${rest.prevPage}`
                    : null,
                nextLink: rest.hasNextPage
                    ? `http://localhost:8080/api/products?${rest.nextPage}`
                    : null,
            }
            return info;
        } catch (error) {
            return error;
        }
    }

    async createOne(obj){
        try {
            const newProduct = await productModel.create(obj);
            return newProduct;
        } catch (error) {
            return error;
        }
    }

    async findById(id){
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (error) {
            return error;
        }
    }

    async updateOne(id, obj){
        try {
            const prodUpdated = await productModel.updateOne({_id:id},{...obj});
            return prodUpdated
        } catch (error) {
            return error;
        }
    }

    async deleteOne(id){
        try {
            const prodDeleted = await productModel.findByIdAndDelete(id);
            return prodDeleted
        } catch (error) {
            return error;
        }
    }
}

export const productsMongo = new ProductsMongo();