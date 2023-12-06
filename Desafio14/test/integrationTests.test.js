import supertest from 'supertest';
import { expect } from 'chai';

const requester = supertest("http://localhost:8080");
const agent = supertest.agent("http://localhost:8080");

let prodAdd1 = "";
let prodAdd2 = "";

describe("Products endpoints tests", () => {
    describe("GET /api/products", () => {
        it("should return an object containing a property called payload", async () => {
            const response = await requester.get('/api/products');
            expect(response._body.products).to.have.property("payload");
        });
        it("should have at least 1 product in the payload array", async () => {
            const response = await requester.get('/api/products');
            expect(response._body.products.payload).to.have.length.greaterThanOrEqual(1);
        });
    });

    describe("POST and DELETE /api/products", () => {
        it("should return a 401 status code unauthorized", async () => {
            const response = await requester.post('/api/products');
            expect(response.statusCode).to.be.equal(401);
        }); 
        before(async function() {
            let bodyLogin = {
                email: "adminCoder@coder.com",
                password: "adminCod3r123"
            }
            const resp = await agent.post("/api/users/login").send(bodyLogin);
            expect(resp.statusCode).to.be.equal(302);
        });
        const newProd = {
            title: "Monitor MSI Optix MAG271CV",
            description: 'Monitor gaming curvo de 27" FHD 192x1080 a 144Hz',
            price: 1200,
            code: "ome603",
            stock: 20,
            category: "Electronicos",
            thumbnails: ["https://asset.msi.com/resize/image/global/product/product_8_20180607094100_5b188d2c3fa82.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png"]
        }
        let id = "";
        it("should return a message and the object of the product created", async () => {
            const response = await agent.post("/api/products").send(newProd);
            expect(response._body).to.have.property("message");
            expect(response._body).to.have.property("product");
            id = response._body.product._id;
        });
        it("should return a message being the object deleted", async () => {
            const response = await agent.delete(`/api/products/${id}`);
            expect(response._body).to.have.property("message");
            expect(response._body.message).to.be.an("object")
        });
        after(async function() {
            const resp = await agent.get("/api/users/logout");
            expect(resp.statusCode).to.be.equal(302);
        });
    });
});

describe("Carts endpoints tests", () => {
    
    describe("POST /api/carts create cart", () => {
        it("Should return a message and the object of the cart recently created", async () => {
            const response = await requester.post("/api/carts");
            expect(response.status).to.be.equal(200);
            expect(response._body).to.have.property('message');
            expect(response._body).to.have.property('cart');
            expect(response._body.message).to.be.a("string");
            expect(response._body.cart).to.be.an("object");
            expect(response._body.cart.products).to.be.an('array').that.is.empty;
        });
    });
    let cartId = "";
    describe("PUT /api/carts/:cid/products/:pid adding products to cart", async () => {
        before(async function() {
            const createUser = {
                first_name: "userTests",
                last_name: "userTesting",
                email: "testerTests@mailtest.com",
                password: "123456",
                age: 25
            };
            const loginData = {
                email: "testerTests@mailtest.com",
                password: "123456"
            }
            const resp = await agent.post("/api/users/signup").send(createUser);
            expect(resp._body).to.have.property("user");
            cartId = resp._body.user.cart;
            const loginResp = await agent.post("/api/users/login").send(loginData);
            expect(loginResp.statusCode).to.be.equal(302);
            const rp = await agent.get('/api/products');
            const products = rp._body.products.payload;
            prodAdd1 = products[parseInt(Math.random() * 10)]._id; // 10 porque solo tengo 9 productos en mi DB de momento
            prodAdd2 = products[parseInt(Math.random() * 10)]._id;
        });
        it("Should add one product in the cart", async () => {
            const response = await agent.put(`/api/carts/${cartId}/products/${prodAdd1}`);
            expect(response._body).to.be.an("object");
            const response2 = await agent.put(`/api/carts/${cartId}/products/${prodAdd2}`);
            expect(response2._body).to.be.an("object");
        });
        it("Should be more than 1 in products array or in quantity", async () => {
            const response = await agent.get(`/api/carts/${cartId}`);
            if(prodAdd1 === prodAdd2) {
                expect(response._body.carrito.products[0].quantity).to.be.equal(2);
            } else{
                expect(response._body.carrito.products).to.have.length.greaterThanOrEqual(1);
            }
        });
        it("Should show an object message when deleting a cart", async () => {
            const response = await agent.delete(`/api/carts/${cartId}`);
            expect(response._body.message).to.be.an("object");
            expect(response._body.message).to.have.property("acknowledged");
            expect(response._body.message.acknowledged).to.be.true;
            expect(response._body.message.deletedCount).to.be.equal(1);
        });
        after(async function() {
            const resp = await agent.get("/api/users/logout");
            expect(resp.statusCode).to.be.equal(302);
        });
    });
});

describe("Sessions tests", () => {
    describe("POST /api/products without an active session", () => {
        it("Should return a message of no active session", async () => {
            const response = await requester.post('/api/products');
            expect(response.statusCode).to.be.equal(401);
            expect(response._body.message).to.be.a('string');
            expect(response._body.message).to.be.equal('No existe una sesion, debe autenticarse.');
        });
    });
    describe("Login with a user account and GET /api/sessions/current, going into on endpoint where the user is unauthorized", () => {
        let userId = "";
        before(async function() {
            let bodyLogin = {
                email: "testerTests@mailtest.com",
                password: "123456"
            }
            const resp = await agent.post("/api/users/login").send(bodyLogin);
            expect(resp.statusCode).to.be.equal(302);
            const resCurrent = await agent.get('/api/sessions/current');
            userId = resCurrent._body.user.id;
        });
        it("Should return an object with user data", async () => {
            const response = await agent.get('/api/sessions/current');
            expect(response._body).to.be.an("object");
            expect(response._body).to.have.property('user');
            expect(response._body.user.role).to.be.equal('user');
        });
        it("Should return 401 unauthorized", async () => {
            const response = await agent.post('/api/products');
            expect(response.statusCode).to.be.equal(401);
            expect(response._body.message).to.be.equal('No esta autorizado a ingresar en esta ruta.');
        });
        after(async function() {
            const resp = await agent.delete(`/api/users/${userId}`);
            expect(resp._body).to.have.property('message');
            expect(resp._body).to.have.property('userDeleted');
        });
    });
});