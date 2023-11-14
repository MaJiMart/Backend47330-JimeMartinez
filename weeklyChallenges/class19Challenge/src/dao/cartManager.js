import CartModel from "../models/cartModel.js";
import { Exception } from "../utilities.js";

export default class CartsManager {
  static getCarts(query = {}) {
    return CartModel.find(query).populate("products.product");
  }

  static async getCartById(cid) {
    const cart = await CartModel.findById(cid).populate("products.product");
    if (!cart) {
      throw new Exception(
        `NOT FOUND: No encontramos el carrito con ID: ${cid}`,
        404
      );
    }
    return cart;
  }

  static async createCart(cart) {
    const { products } = cart;

    try {
      const newCart = new CartModel({ products });
      const createdCart = await newCart.save();
      console.log("Carrito creado con éxito");
      return createdCart;
    } catch (error) {
      throw new Exception(`Error al crear el carrito: ${error.message}`, 500);
    }
  }

  static async updateCart(cid, data) {
    try {
      const updatedCart = await CartModel.updateOne({ _id: cid }, data);

      if (updatedCart.modifiedCount === 0) {
        throw new Exception(
          `NOT FOUND: No encontramos el carrito con ID: ${cid}`,
          404
        );
      }
      return console.log("Carrito actualizado con éxito");
    } catch (error) {
      throw new Exception(
        `Error al actualizar el carrito: ${error.message}`,
        500
      );
    }
  }

  static async addProductToCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new Exception(
          `NOT FOUND: No encontramos el carrito con ID: ${cid}`,
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
      console.log("Producto agregado al carrito con éxito");
    } catch (error) {
      throw new Exception(
        `Error al agregar el producto: ${error.message}`,
        500
      );
    }
  }

  /* static async updateQuantity(cid, pid, data){
        try {
            const updatedCart = await CartModel.updateOne({ _id: cid }, data);
            
            if (updatedCart.modifiedCount === 0) {
                throw new Exception(`NOT FOUND: No encontramos el carrito con ID: ${cid}`, 404);
            }
            return console.log('Carrito actualizado con éxito');
        } catch (error) {
            throw new Exception(`Error al actualizar el carrito: ${error.message}`, 500);
        }
    } */

  static async updateQuantity(cid, pid, data) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new Exception(
          `NOT FOUND: No encontramos el carrito con ID: ${cid}`,
          404
        );
      }

      const productIndex = cart.products.findIndex(
        (products) => products.product === pid
      );
      if (productIndex === -1) {
        throw new Exception(
          `NOT FOUND: El producto con ID: ${pid} no existe en el carrito`,
          404
        );
      }

      if (data.quantity !== undefined) {
        cart.products[productIndex].quantity = data.quantity;
      } else {
        throw new Exception(
          "La cantidad del producto no se proporcionó en req.body",
          400
        );
      }
      await cart.save();
      console.log("Cantidad del producto actualizada con éxito en el carrito");
    } catch (error) {
      throw new Exception(
        `Error al actualizar la cantidad del producto en el carrito: ${error.message}`,
        500
      );
    }
  }

  static async deleteProductToCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new Exception(
          `NOT FOUND: No encontramos el carrito con ID: ${cid}`,
          404
        );
      }
      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === pid
      );
      if (productIndex === -1) {
        throw new Exception(
          `NOT FOUND: El producto con ID: ${pid} no existe en el carrito`,
          404
        );
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
      console.log("Producto eliminado del carrito con éxito");
    } catch (error) {
      throw new Exception(
        `Error al eliminar el producto del carrito: ${error.message}`,
        500
      );
    }
  }

  static async emptyCart(cid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new Exception(
          `NOT FOUND: No encontramos el carrito con ID: ${cid}`,
          404
        );
      }
      cart.products = [];
      await cart.save();

      console.log("Los productos han sido eliminados del carrito con éxito");
    } catch (error) {
      throw new Exception(
        `Error al eliminar todos los productos del carrito: ${error.message}`,
        500
      );
    }
  }

  static async deleteCart(cid) {
    try {
      const deletedCart = await CartModel.deleteOne({ _id: cid });

      if (deletedCart.deletedCount === 0) {
        throw new Exception(
          `NOT FOUND: No encontramos el carrito con ID: ${cid}`,
          404
        );
      }

      return console.log("Carrito eliminado con éxito");
    } catch (error) {
      throw new Exception(
        `Error al eliminar el carrito: ${error.message}`,
        500
      );
    }
  }
}
