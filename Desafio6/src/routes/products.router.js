import { Router } from "express";
//import productManager from '../ProductManager.js';
import { productsMongo } from '../dao/mongoManagers/ProductsMongo.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productsMongo.findAll(req.query);
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({error});
    }
});

router.get('/:pId', async (req, res) => {
    const { pId } = req.params;
    try {
        const product = await productsMongo.findById(pId);
        if(product)
            res.status(200).json({ message: `Product ${pId}`, product});
        else
            res.status(200).json({ message: `Error`, product});
    } catch (error) {
        res.status(500).json({error});
    }
});

router.post('/', async (req, res) => {
    try {
        const {title, description, code, price, status=true, stock, category, thumbnails=[]} = req.body;
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
            const newProduct = await productsMongo.createOne(sendData);
            res.json(newProduct);
        } else{
            res.status(400).json({message: 'Error, todos los campos son obligatorios.'})
        }
    } catch (error) {
        res.status(500).json({error});
    }
});

router.put('/:pId', async (req, res) => {
    const { pId } = req.params;
    try {
        const prodUpdated = await productsMongo.updateOne(pId, req.body);
        res.status(200).json({message: prodUpdated});
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete('/:pId', async (req, res) => {
    const { pId } = req.params;
    try {
        const resp = await productsMongo.deleteOne(pId);
        res.status(200).json({message: resp});
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;