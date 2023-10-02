import express from 'express';
import ProductsManager from './productManager.js';

const app = express();
const productsManager = new ProductsManager('../products.json');

app.use (express.json());
app.use (express.urlencoded({extended:true}))

app.get ('/', (req, res) => {
    const welcome = `<h1 style='color:grey'>Welcome to the shop</h1>`
    res.send (welcome)
    
})

app.get ('/products', async (req, res) =>{
    const products = await productsManager.getProduct();
    const limit = req.query.limit;
    if (limit){
        res.send(products.slice (0,limit));
    }else{
        res.send(products)
    }
})

app.get("/products/:pid" , async (req, res) => {
    let productoId = await productsManager.getProductById(req.params.pid)
    res.send(productoId)
})

app.listen (8080, () => console.log('servidor corriendo 8080'))