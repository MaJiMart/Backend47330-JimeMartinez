import { Server } from 'socket.io';

let io;

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', (socketClient)=>{
        console.log(`Se ha conectado un nuevo cliente con id ${socketClient.id}`);
    
        socketClient.on('disconnect', () =>{
            console.log(`Se ha desconectado el cliente con id ${socketClient.id}`);
        })
    })

    console.log('Server socket running ✔️');
};