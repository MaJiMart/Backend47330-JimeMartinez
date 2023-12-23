import ProductDao from '../dao/productDao.js';

export default class ProductService {
  static getProducts(filter = {}) {
    return ProductDao.getProducts(filter);
  }

  static getProdById(pid) {
    return ProductDao.getProdById(pid);
  }

  static createProduct(payload) {
    const product = ProductDao.createProduct(payload);
    return product
  }

  static updateProduct(pid, payload) {
    return ProductDao.updateProduct(pid, payload);
  }

  static deleteProduct(pid) {
    return ProductDao.deleteProduct(pid);
  }
}
