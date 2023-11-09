import { Router } from "express";
import CartModel from "../../models/cartModel.js";

const router = Router();

router.get("/cart/:cid", async (req, res) => {
  const {
    params: { cid },
  } = req;
  const cart = await CartModel.findById(cid).populate("products.product");
  const cartData = cart.toJSON();
  //console.log(JSON.stringify(cart, null, 2));
  //console.log(cartData);
  res.render("cart", cartData);
});

/* const buildResponse = (data) => {
    return {
        payload: data.docs.map(cart => cart.toJSON()),
    }
}; */

export default router;
