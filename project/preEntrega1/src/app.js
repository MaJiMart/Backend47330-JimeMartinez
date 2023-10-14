import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/statics', express.static(path.join(__dirname, '../public')));

app.use('/api', productsRouter, cartsRouter)

app.get ('/', (req, res) => {
    const welcome = `<h1 style='color:grey'>Welcome to the shop</h1>`
    res.send (welcome)
    
})

app.listen(PORT, ()=>{console.log(`Server running on http://localhost:${PORT}`)});