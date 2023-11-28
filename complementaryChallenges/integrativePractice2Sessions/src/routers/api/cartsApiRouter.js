import { Router } from "express";
import CartManager from "../../dao/cartManager.js";

const router = Router();

router.get("/carts", async (req, res) => {
  const { query = {} } = req;
  const carts = await CartManager.getCarts(query);
  res.status(200).json(carts);
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const { params: { cid } } = req;
    const cart = await CartManager.getCartById(cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.post("/carts", async (req, res) => {
  const { body } = req;
  const newCart = await CartManager.createCart(body);
  res.status(201).json(newCart);
});

router.put("/carts/:cid", async (req, res) => {
  try {
    const { params: { cid }, body } = req;
    await CartManager.updateCart(cid, body);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.put("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const { params: { cid, pid } } = req;
    const { quantity } = req.body;
    await CartManager.updateQuantity(cid, pid, quantity);
    res.status(201).json({ message: "Cantidad actualizada con éxito" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.post("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const { params: { cid, pid } } = req;
    await CartManager.addProductToCart(cid, pid);
    res.status(200).json({ message: "Producto agregado con éxito" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const { params: { cid, pid } } = req;
    await CartManager.deleteProductToCart(cid, pid);
    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete("/carts/:cid", async (req, res) => {
  try {
    const { params: { cid } } = req;
    await CartManager.emptyCart(cid);
    res.status(200).json({ message: "Carrito vaciado con éxito" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
