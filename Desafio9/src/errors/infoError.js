export const generateProductErrorInfo = (product) => {
    return `Falta una o mas propiedades o los valores recibidos no son validos.
    Estos son las propiedades requeridas:
    ** title        : debe ser una cadena (String), se recibió ${product.title}
    ** description  : debe ser una cadena (String), se recibió ${product.description}
    ** price        : debe ser un numero, se recibió ${product.price}
    ** stock        : debe ser un numero, se recibió ${product.stock}
    ** category     : debe ser una cadena (String), se recibió ${product.category}
    ** code         : debe ser una cadena (String), se recibió ${product.code}`;
}