import CartModel from '../models/cartModel.js';
import { Exception } from '../utilities.js';

export default class CartsDao {
  static getCarts(criteria = {}) {
    return CartModel.find(criteria).populate('products.product');
  }

  static async createCart(data) {
    return CartModel.create(data);
  }

  static getCartById(cid) {
    return CartModel.findById({ _id: cid });
  }

  static updateCart(cid, data) {
    return CartModel.updateOne({ _id: cid }, data);
  }

  static async updateQuantity(cid, pid, data) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new Exception(
          `NOT FOUND: We can't find the cart with ID: ${cid}`,
          404
        );
      }
      const productIndex = cart.products.findIndex(
        (products) => products.product.toString() === pid
      );
      console.log(productIndex);
      if (productIndex === -1) {
        throw new Exception(
          `NOT FOUND: The product with ID: ${pid} does not exist in the cart`,
          404
        );
      }

      if (data.quantity !== undefined) {
        cart.products[productIndex].quantity = data.quantity;
      } else {
        throw new Exception(
          'Product quantity was not provided in req.body',
          400
        );
      }
      await cart.save();
      console.log('Product quantity successfully updated in cart');
    } catch (error) {
      throw new Exception(
        `Error updating the quantity of the product in the cart: ${error.message}`,
        500
      );
    }
  }

  static async addProductToCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new Exception(
          `NOT FOUND: We can't find the cart with ID: ${cid}`,
          404
        );
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
        throw new Exception(
          `NOT FOUND: We can't find the cart with ID: ${cid}`,
          404
        );
      }
      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === pid
      );
      if (productIndex === -1) {
        throw new Exception(
          `NOT FOUND: The product with ID: ${pid} does not exist in the cart`,
          404
        );
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
        throw new Exception(
          `NOT FOUND: We can't find the cart with ID: ${cid}`,
          404
        );
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
