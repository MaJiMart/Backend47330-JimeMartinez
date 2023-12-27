import CartDao from '../dao/cartDao.js';

export default class CartService {
  static findCarts(filter = {}) {
    return CartDao.getCarts(filter);
  }

  static async create(payload) {
    const newCart = await CartDao.createCart(payload);
    console.log(`Successfully created cart (ID: ${newCart._id})`);
    return newCart;
  }

  static getById(cid) {
    return CartDao.getCartById(cid);
  }

  static updateCart(cid, payload) {
    return CartDao.updateCart(cid, payload);
  }

  static updateQuantity(cid, pid, payload) {
    return CartDao.updateQuantity(cid, pid, payload);
  }

  static addProductToCart(cid, pid) {
    return CartDao.addProductToCart(cid, pid);
  }

  static deleteProductToCart(cid, pid) {
    return CartDao.deleteProductToCart(cid, pid);
  }

  static emptyCart(cid) {
    return CartDao.emptyCart(cid);
  }
}
