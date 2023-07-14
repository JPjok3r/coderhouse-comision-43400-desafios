class ProductManager{
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products; 
    }

    addProduct(title, description, price, code, thumbnail, stock) {
        let msg = '';
        if (arguments.length !== 6){
            msg = 'Error. Todos los campos son obligatorios';
        } else{
            let validToAdd = this.products.find((product) =>product.code === code);
            if(!validToAdd){
                const newProduct = {
                    id: this.products.length+1,
                    title: title,
                    description: description,
                    price: Number(price),
                    code: code,
                    thumbnail: thumbnail,
                    stock: parseInt(stock) 
                }
                this.products.push(newProduct);
                msg = 'Exito al agregar el producto' ;
            } else {
                msg = 'Error. El codigo ingresado ya existe';
            }
        }
        return msg;
    }

    getProductById(id){
        let producto = this.products.find(p => p.id === id)
        if(producto)
            return producto;
        else
            return "Error. Product not found";
    }
}

const product = new ProductManager();
console.log(product.getProducts());
console.log(product.addProduct("Producto1", "Descripcion producto 1", 123, "abc123", "Sin imagen", 25));
console.log(product.getProducts());
console.log(product.addProduct("Producto1", "Descripcion producto 1", 123, "abc123", "Sin imagen", 25));
console.log(product.addProduct("Producto1", 123, "abc123", "Sin imagen", 25));
console.log(product.getProductById(1));
console.log(product.getProductById(5));