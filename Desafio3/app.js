import express from 'express';
import productManager from './ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.get('/', (req, res) => {
    res.redirect('/api/products');
});

app.get('/api/products', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        if(limit){
            const prodLimit = products.slice(0, +limit);
            res.status(200).json({message: 'Products', prodLimit});
        } else{
            res.status(200).json({message: 'Products', products});
        }
    } catch (error) {
        res.status(500).json({error});
    }
});

app.get('/api/products/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await productManager.getProductById(+productId);
        if(typeof product === 'object')
            res.status(200).json({ message: `Product ${productId}`, product});
        else
            res.status(200).json({ message: `Error`, product});
    } catch (error) {
        res.status(500).json({error});
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado, escuchando en 3000');
})

