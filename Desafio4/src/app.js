import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import productManager from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Config para usar handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor iniciado, escuchando en: ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log(`Cliente conectado: ${socket.id}`); 

    socket.on('agregar', async (objProd) => {
        const opAdd = await productManager.addProduct(objProd);
        if(opAdd.operation){
            socketServer.emit('added', opAdd.newProduct);
        } else{
            socket.emit('added', opAdd.message);
        }
    });

    socket.on('eliminar', async (id) => {
        const opDel = await productManager.deleteProduct(id);
        if(opDel.operation){
            socketServer.emit("deleted", opDel.modData);
        } else{
            socket.emit("deleted", opDel.message);
        }
    });
});
