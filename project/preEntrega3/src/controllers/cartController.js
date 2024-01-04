import CartService from '../services/cartService.js';
import { NotFound } from '../utilities.js';

export default class CartController {
  static async getCarts(query = {}) {
    const carts = await CartService.getCarts(query);
    return carts;
  }

  static async createCart(data) {
    const newCart = await CartService.createCart(data);
    console.log('Cart created successfully');
    return newCart;
  }

  static async getCart(cid) {
    const cart = await CartService.getCarts({ _id: cid });
    if (!cart) {
      throw new NotFound(
        `NOT FOUND: We can't find the cart with ID: ${cid}`);
    }
    return cart;
  }

  static async updateCart(cid, data) {
    const cart = await CartService.getCarts({ _id: cid });
    if (!cart) {
      throw new NotFound(
        `NOT FOUND: We can't find the cart with ID: ${cid}`);
    }
    const updateCart = await CartService.updateCart(cid, data);
    console.log('Cart updated successfully');
    return updateCart;
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

}
