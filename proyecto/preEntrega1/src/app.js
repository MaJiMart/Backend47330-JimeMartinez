import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/statics', express.static(path.join(__dirname, '../public')));

app.use('api', productsRouter, cartsRouter)


app.listen(PORT, ()=>{console.log(`Server running on http://localhost:${PORT}`)});