import { Router } from 'express';
//import CartModel from "../../models/cartModel.js";
import CartManager from '../../dao/cartManager.js'


const router = Router();

router.get("/cart/:cid", async (req, res) => {
  const { params: { cid } } = req;
  try {
    const result = await CartManager.getCartById(cid)
    res.render('cart', buildResponse(cid, result))
  } catch (error) {
    console.error('Error', error.message);
  }
});

const buildResponse = (cid, data) => {
  const payload = data.products.map(product => product.toJSON())
    return {
        cartId: cid,
        payload
    }
};

export default router;
