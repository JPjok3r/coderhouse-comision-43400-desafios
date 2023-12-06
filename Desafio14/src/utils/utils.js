import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const dirPath = dirname(fileURLToPath(import.meta.url));
export const __dirname = join(dirPath, "../");

export const hashData = async (data)=>{
    return bcrypt.hash(data,10)
}

export const compareData = async (data, hashData)=>{
    return bcrypt.compare(data, hashData)
}

export const generateMockProducts = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({min:200, max: 1200}),
        code: faker.string.alphanumeric({length: 6, casing: 'upper'}),
        stock: faker.number.int({max: 100}),
        category: faker.commerce.department(),
        status: faker.datatype.boolean({probability: Math.random().toFixed(2)}),
        thumbnails: [faker.image.url()]
    }
    return product;
}