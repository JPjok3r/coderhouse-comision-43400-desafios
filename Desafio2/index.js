// Similar al anterior desafio pero usando archivos

const fs = require('fs');

class ProductManager{
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try{
            if(fs.existsSync(this.path)){
                const prodVal = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(prodVal);
            } else{
                return [];
            }
        } catch (error){
            return `No se puede leer el archivo debido a ${error}`;
        }
    }

    async addProduct(prodObj) {
        try {
            const arrProdAnt = await this.getProducts();
            let id = !arrProdAnt.length ? 1 : arrProdAnt[arrProdAnt.length-1].id + 1;
            arrProdAnt.push({...prodObj, id});
            await fs.promises.writeFile(this.path, JSON.stringify(arrProdAnt));
            return 'Producto agregado con exito!!';
        } catch (error) {
            return error
        }
    }

    async getProductById(id){
        try {
            const arrProdAnt = await this.getProducts();
            const auxProd = arrProdAnt.find(prod => prod.id === id);
            if(auxProd)
                return auxProd;
            else
                return 'El producto no existe';
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id) {
        try {
            const arrProdAnt = await this.getProducts();
            if(!arrProdAnt.find(prod => prod.id === id)){
                return 'El id proporcionado no existe'
            }
            const newArrProducts = arrProdAnt.filter(p => p.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArrProducts));
            return 'Producto eliminado con éxito!';
        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, prodObj) {
        try {
            const arrProdAnt = await this.getProducts();
            const prodIdx = arrProdAnt.findIndex(p => p.id === id);
            if(prodIdx === -1){
                return 'Error. Producto inexistente. No se puede modificar';
            } 
            const prod = arrProdAnt[prodIdx];
            const newDataProd = {...prod, ...prodObj};
            arrProdAnt[prodIdx] = newDataProd;
            await fs.promises.writeFile(this.path, JSON.stringify(arrProdAnt));
            return 'Producto modificado con éxito!';
        } catch (error) {
            return error;
        }
    }
}

const product1 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}
const product2 = {
    title: 'producto 2',
    description: 'Este es un producto prueba',
    price: 150,
    thumbnail: 'Sin imagen',
    code: 'pfg356',
    stock: 25
}
const product3 = {
    title: 'producto de prueba 3',
    description: 'Este es un producto prueba',
    price: 600,
    thumbnail: 'Sin imagen',
    code: 'ufb325',
    stock: 25
}
const product4 = {
    title: 'producto prueba 4',
    description: 'Este es un producto prueba',
    price: 80,
    thumbnail: 'Sin imagen',
    code: 'eyc741',
    stock: 25
}
const product5 = {
    title: 'producto prueba 5',
    description: 'Este es un producto prueba',
    price: 1200,
    thumbnail: 'Sin imagen',
    code: 'cfg856',
    stock: 25
}
const product6 = {
    title: 'producto prueba 6',
    description: 'Este es un producto prueba',
    price: 450,
    thumbnail: 'Sin imagen',
    code: 'qax159',
    stock: 25
}

const product = new ProductManager('ProductsStore.json');
async function tests() {
    console.log(await product.getProducts());
    console.log(await product.addProduct(product1));
    console.log(await product.addProduct(product2));
    console.log(await product.addProduct(product3));
    console.log(await product.addProduct(product4));
    console.log(await product.addProduct(product5));
    console.log(await product.addProduct(product6));
    console.log(await product.getProducts());
    console.log(await product.getProductById(2));
    console.log(await product.deleteProduct(5));
    console.log(await product.updateProduct(1,{title: 'Producto 1', stock: 50}));
    console.log(await product.updateProduct(10,{title: 'Producto 1', stock: 50}));
}
tests();