import { Router } from 'express';
import ProductController from '../../controllers/productController.js';
import { authenticationMidd, authorizationMidd } from '../../utilities.js';

const router = Router();

router.get('/products', async (req, res, next) => {
  try {
    const { query = {} } = req;
    const products = await ProductController.getProducts(query);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/products/:pid', async (req, res, next) => {
  try {
    const {
      params: { pid },
    } = req;
    const product = await ProductController.getProdById(pid);
    res.status(200).json(product);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.post('/products', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
  try {
    const { body } = req;
    const newProduct = await ProductController.createProduct(body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put('/products/:pid', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
  try {
    const {
      params: { pid },
      body,
    } = req;
    await ProductController.updateProduct(pid, body);
    res.status(201).json(body);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.delete('/products/:pid', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
  try {
    const {
      params: { pid },
    } = req;
    await ProductController.deleteProduct(pid);
    res.status(200).json({ message: 'Product successfully removed' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

export default router;
