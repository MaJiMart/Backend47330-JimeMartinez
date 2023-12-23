import { Router } from 'express';
import CartController from '../../controllers/cartController.js';

const router = Router();

router.get('/carts', async (req, res, next) => {
  try {
    const { query = {} } = req;
    const carts = await CartController.getCarts(query);
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
});

router.post('/carts', async (req, res, next) => {
  try {
    const { body } = req;
    const newCart = await CartController.createCart(body);
    res.status(201).json(newCart);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.get('/carts/:cid', async (req, res, next) => {
  try {
    const {
      params: { cid },
    } = req;
    const cart = await CartController.getCart(cid);
    res.status(200).json(cart);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.put('/carts/:cid', async (req, res, next) => {
  try {
    const {
      params: { cid },
      body,
    } = req;
    await CartController.updateCart(cid, body);
    res.status(204).end();
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.put('/carts/:cid/products/:pid', async (req, res, next) => {
  try {
    const {
      params: { cid, pid },
    } = req;
    const { quantity } = req.body;
    await CartController.updateQuantity(cid, pid, { quantity });
    res.status(201).json({ message: 'Product quantity successfully updated' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.post('/carts/:cid/products/:pid', async (req, res) => {
  try {
    const {
      params: { cid, pid },
    } = req;
    await CartController.addProductToCart(cid, pid);
    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete('/carts/:cid/products/:pid', async (req, res) => {
  try {
    const {
      params: { cid, pid },
    } = req;
    await CartController.deleteProductToCart(cid, pid);
    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete('/carts/:cid', async (req, res) => {
  try {
    const {
      params: { cid },
    } = req;
    await CartController.emptyCart(cid);
    res.status(200).json({ message: 'The products have been successfully removed from the cart' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
