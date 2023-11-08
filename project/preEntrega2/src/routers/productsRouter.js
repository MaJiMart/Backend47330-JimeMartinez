import { Router } from 'express';
import ProductModel from '../models/productModel.js'
//import ProductsManager from '../dao/productManager.js';

const router = Router();

//Api
router.get('/products', async (req, res) =>{
    const { query = {} } = req;
    const products = await ProductsManager.getProducts(query);
    res.status(200).json(products);
});

router.get('/products/:pid', async (req, res) => {
    try {
        const { params: { pid } } = req;
        const product = await ProductsManager.getProductById(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message});
    }
});

router.post('/products', async (req, res) =>{
    const { body } = req;
    const newProduct = await ProductsManager.createProduct(body);
    res.status(201).json(newProduct);
});

router.put('/products/:pid', async (req, res) =>{
    try {
        const { params: { pid }, body} = req;
        await ProductsManager.updateProduct(pid, body);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message});
    }
});

router.delete('/products/:pid', async (req, res) => {
    try {
        const { params: { pid } } = req;
        await ProductsManager.deleteProduct(pid);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message});
    }
});

//Viwes
router.get('/products', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const criteria = {};
    const ops = { page, limit };
    const result = await ProductModel.paginate(criteria, ops)
    res.render('products',buildResponse(result));
});

const buildResponse = (data) => {
    return {
        status: 'success',
        payload: data.docs.map(product => product.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}` : '',
        nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}` : ''
    }
};

export default router;




/* router.get('/products', (req, res) => {
    res.render('products', {title: 'Productos'});
});

router.get('/api/products', async (req, res) => {
    const criteria = {};
    const ops = {};
    const result = await ProductModel.paginate(criteria, ops)
    res.status(200).json(result);
}); */