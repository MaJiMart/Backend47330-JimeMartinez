import CartService from '../services/cartService.js';
import { Exception } from '../utilities.js';

export default class CartController {
  static async getCarts(query = {}) {
    const carts = await CartService.findCarts(query);
    return carts;
  }

  static async createCart(data) {
    const newCart = await CartService.create(data);
    console.log('Cart created successfully');
    return newCart;
  }

  static getCart(cid) {
    const cart = CartService.getById(cid);
    if (!cart) {
      throw new Exception(
        `NOT FOUND: We can't find the cart with ID: ${cid}`,
        404
      );
    }
    return cart;
  }

  static async updateCart(cid, data) {
    const cart = await CartController.getCart(cid);
    if (!cart) {
      throw new Exception(
        `NOT FOUND: We can't find the cart with ID: ${cid}`,
        404
      );
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
