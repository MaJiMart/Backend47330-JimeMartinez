import CartModel from '../models/cartModel.js';
import { Exception, NotFound } from '../utilities.js';

export default class CartsDao {
  static getCarts(criteria = {}) {
    return CartModel.find(criteria).populate('products.product');
  }

  static async createCart(data) {
    return CartModel.create(data);
  }

  static updateCart(cid, data) {
    const cart = CartModel.updateOne({ _id: cid }, data);
    return cart
  }

  /* static async updateQuantity(cid, pid, data) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new NotFound(
          `NOT FOUND: We can't find the cart with ID: ${cid}`);
      }
      const productIndex = cart.products.findIndex(
        (products) => products.product.toString() === pid
      );
      if (productIndex === -1) {
        throw new NotFound(
          `NOT FOUND: The product with ID: ${pid} does not exist in the cart`);
      }

      if (data.quantity !== undefined) {
        cart.products[productIndex].quantity = data.quantity;
      } else {
        throw new BadRequest(
          'Product quantity was not provided in req.body');
      }
      await cart.save();
      console.log('Product quantity successfully updated in cart');
    } catch (error) {
      throw new Exception(
        `Error updating the quantity of the product in the cart: ${error.message}`,
        500
      );
    }
  } */

  static async addProductToCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new NotFound(
          `NOT FOUND: We can't find the cart with ID: ${cid}`);
      }

      const existProduct = cart.products.find(
        (product) => product.product.toString() === pid
      );
      if (!existProduct) {
        cart.products.push({ product: pid, quantity: 1 });
      } else {
        existProduct.quantity++;
      }
      await cart.save();
      console.log('Product added to cart successfully');
    } catch (error) {
      throw new Exception(`Error adding product: ${error.message}`, 500);
    }
  }

  static async deleteProductToCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new NotFound(
          `NOT FOUND: We can't find the cart with ID: ${cid}`);
      }
      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === pid
      );
      if (productIndex === -1) {
        throw new NotFound(
          `NOT FOUND: The product with ID: ${pid} does not exist in the cart`);
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
      console.log('Product removed from cart successfully');
    } catch (error) {
      throw new Exception(
        `Error removing product from cart: ${error.message}`,
        500
      );
    }
  }

  static async emptyCart(cid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new NotFound(
          `NOT FOUND: We can't find the cart with ID: ${cid}`);
      }
      cart.products = [];
      await cart.save();
      console.log('The products have been successfully removed from the cart');
    } catch (error) {
      throw new Exception(
        `Error removing all products from cart: ${error.message}`,
        500
      );
    }
  }
}
