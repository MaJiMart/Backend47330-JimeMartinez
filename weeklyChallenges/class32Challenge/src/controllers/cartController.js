import CartService from '../services/cartService.js';
import { NotFound, Exception } from '../utilities.js';

export default class CartController {
  static async getCarts(query = {}) {
    try {
      const carts = await CartService.getCarts(query);
      return carts;
    } catch (error) {
      throw new Exception(`Error getting carts: ${error.message}`, 500);
    }
  }

  static async createCart(data) {
    try {
      return await CartService.createCart(data);
    } catch (error) {
      throw new Exception(`Error creating cart: ${error.message}`, 500);
    }
  }

  static async getCart(cid) {
    const cart = await CartService.getCarts({ _id: cid });
    if (!cart) {
      throw new NotFound(`NOT FOUND: We can't find the cart with ID: ${cid}`);
    }
    return cart;
  }

  static async updateCart(cid, data) {
    try {
      await CartController.getCart(cid);
      await CartService.updateCart(cid, data);
    } catch (error) {
      throw new Exception(`Error updating cart: ${error.message}`, 500);
    }
  }

  static async updateQuantity(cid, pid, data) {
    return await CartService.updateQuantity(cid, pid, data);
  }

  static async addProductToCart(cid, pid) {
    return await CartService.addProductToCart(cid, pid);
  }

  static async deleteProductToCart(cid, pid) {
    return await CartService.deleteProductToCart(cid, pid);
  }

  static async emptyCart(cid) {
    return await CartService.emptyCart(cid);
  }

  /* static async updateCartAfterPurchase(cart, failedProductIds) {
    const filteredItems = cart.items.filter((item) => !failedProductIds.includes(item.product.toString()));

    const updatedCart = await CartService.updateCart(
      cart._id,
      { items: filteredItems },
      { new: true }
    );

    return updatedCart;
  } */
}
