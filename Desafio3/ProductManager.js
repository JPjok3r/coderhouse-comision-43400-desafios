import fs from 'fs';

class ProductsManager{
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

const productManager = new ProductsManager('products.json');
export default productManager