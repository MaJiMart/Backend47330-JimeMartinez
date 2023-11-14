import { Server } from 'socket.io';
import ProductsManager from './dao/productManager.js';

let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (socketClient)=>{
        console.log(`Se ha conectado un nuevo cliente con id ${socketClient.id}`);
        let products = await ProductsManager.getProducts();
        
        socketClient.emit('listProducts',  products)

        socketClient.on('addProduct', async (newProduct)=>{
            await ProductsManager.createProduct(newProduct);
            let products = await ProductsManager.getProducts();
            io.emit('listProducts', products)
        })
        
        socketClient.on('deleteProduct', async (pid)=>{
            await ProductsManager.deleteProduct(pid);
            let products = await ProductsManager.getProducts();
            io.emit('listProducts', products)
        })

        socketClient.on('disconnect', () =>{
            console.log(`Se ha desconectado el cliente con id ${socketClient.id}`);
        })
    })

    console.log('Server socket running ✔️');
};