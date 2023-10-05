import { getAll, getById, create, update, deleteProduct } from "../services/products.service.js";

export const getProducts = async (req, res) => {
    try {
        const products = await getAll(req.query);
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({error});
    }
}

export const getProductById = async (req, res) => {
    const { pId } = req.params;
    try {
        const product = await getById(pId);
        if(product)
            res.status(200).json({ message: `Product ${pId}`, product});
        else
            res.status(200).json({ message: `Error`, product});
    } catch (error) {
        res.status(500).json({error});
    }
}

export const createProduct = async (req, res) => {
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
            const newProduct = await create(sendData);
            res.status(200).json({message: "Producto creado exitosamente", product: newProduct});
        } else{
            res.status(400).json({message: 'Error, todos los campos son obligatorios.'})
        }
    } catch (error) {
        res.status(500).json({error});
    }
}

export const updateProduct = async (req, res) => {
    const { pId } = req.params;
    try {
        const product = await update(pId, req.body);
        res.status(200).json({ message: product});
    } catch (error) {
        res.status(500).json({error});
    }
}

export const delProduct = async (req, res) => {
    const { pId } = req.params;
    try {
        const response = await deleteProduct(pId);
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(500).json({error});
    }
}