import { Router } from 'express';
import ProductController from '../../controllers/productController.js';
import { authenticationMidd, authorizationMidd } from '../../utilities.js';
import CustomError from '../../utils/customError.js';
import EnumsErrors from '../../utils/enumsError.js';
import { createProdError } from '../../utils/causeMessageError.js';

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
      const {
        body: { title, description, code, price, stock },
      } = req;
      if (!title||!description||!code||!price||!stock){
        CustomError.createError({
          name: 'Error creating product',
          cause: createProdError({ title, description, code, price, stock }),
          message: 'An error occurred while trying to create the product',
          code: EnumsErrors.INVALID_TYPE_ERROR
        })
      }
      const newProduct = await ProductController.createProduct(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);
/* router.post('/products', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
  try {
    const { body } = req;
    const newProduct = await ProductController.createProduct(body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
}); */

router.put('/products/:pid', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
    try {
      const {
        params: { pid },
        body,
      } = req;
      await ProductController.updateProduct(pid, body);
      res.status(201).json(body);
    } catch (error) {
      next(
        res.status(error.statusCode || 500).json({ message: error.message })
      );
    }
  }
);

router.delete('/products/:pid', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
    try {
      const {
        params: { pid },
      } = req;
      await ProductController.deleteProduct(pid);
      res.status(200).json({ message: 'Product successfully removed' });
    } catch (error) {
      next(
        res.status(error.statusCode || 500).json({ message: error.message })
      );
    }
  }
);

export default router;
