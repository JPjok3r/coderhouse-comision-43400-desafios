import { productsMongo } from "../DAO/managers/ProductsMongo.js";

export const getAll = async (obj) => {
    const resProducts = await productsMongo.findAll(obj);
    return resProducts;
}

export const getById = async (id) => {
    const resProduct = await productsMongo.findById(id);
    return resProduct;
}

export const create = async (obj) => {
    const response = await productsMongo.createOne(obj);
    return response;
}

export const update = async (id, obj) => {
    const response = await productsMongo.updateOne(id, obj);
    return response;
}

export const deleteProduct = async (id) => {
    const response = await productsMongo.deleteOne(id);
    return response;
}