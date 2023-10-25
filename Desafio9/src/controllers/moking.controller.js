import { generateMockProducts } from "../utils.js";

class MockingProducts{
    getMockProducts(req, res){
        const products = [];
        for (let i = 0; i < 100; i++) {
            const prodMocked = generateMockProducts();
            products.push(prodMocked);
        }
        res.status(200).json(products);
    }
}

export const mockingProducts = new MockingProducts();