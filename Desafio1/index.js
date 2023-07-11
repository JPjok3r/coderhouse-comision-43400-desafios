class ProductManager{
    constructor() {
        this.products = [];
    }

    getProducts() {
        return [...this.products]; 
    }

    addProduct(title, description, price, code, thumbnail, stock) {
        if (arguments.length !== 6){
            console.log(`Error. Todos los campos son obligatorios`);
        } else{
            let validToAdd = true;
            this.products.forEach((product) =>{
                if(product.code === code)
                    validToAdd = false;
            });
            if(validToAdd){
                const newProduct = {
                    id: this.generateId(),
                    title: title,
                    description: description,
                    price: Number(price),
                    code: code,
                    thumbnail: thumbnail,
                    stock: parseInt(stock) 
                }
                this.products.push(newProduct);
            } else {
                console.log('Error. El codigo ingresado ya existe');
            }
        }
    }

    getProductById(id){
        let indexOfP = -1;
        this.products.forEach((product, i) =>{
            if(product.id === id)
                indexOfP = i;
        });
        if(indexOfP !== -1)
            return this.products[indexOfP];
        else
            return "Error. Product not found";
    }

    generateId() {
        return (this.products.length+1);
    }
}

const product = new ProductManager();
console.log(product.getProducts());
product.addProduct("Producto1", "Descripcion producto 1", 123, "abc123", "Sin imagen", 25);
console.log(product.getProducts());
product.addProduct("Producto1", "Descripcion producto 1", 123, "abc123", "Sin imagen", 25);
product.addProduct("Producto1", 123, "abc123", "Sin imagen", 25);
console.log(product.getProductById(1));
console.log(product.getProductById(5));