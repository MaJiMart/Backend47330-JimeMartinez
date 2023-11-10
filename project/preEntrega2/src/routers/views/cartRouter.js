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
    console.log('Error', error.message);
  }
 /*  const cart = await CartModel.findById(cid).populate("products.product");
  const cartData = cart.toJSON();
  console.log(JSON.stringify(cart, null, 2));
  console.log(cartData);
  res.render("cart", cartData); */
});

const buildResponse = (cid, data) => {
  const payload = data.products.map(product => product.toJSON())
    console.log("payload", payload)
    return {
        cartId: cid,
        payload
    }
};

export default router;
