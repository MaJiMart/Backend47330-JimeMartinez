import { Router } from "express";
import { generateID } from '../utilities.js';
import ProductsManager from "../data/productManager.js";

const productsRouter = Router();

const productManager = new ProductsManager('../products.json');

productsRouter.get('/products', async (req, res) => {
    let products = await productManager.getProduct();
    const limit = req.query.limit;
    if (limit){
        res.status(200).send(products.slice(0, limit));
    }else{
        res.status(200).send(products);
    }
})

export default productsRouter;