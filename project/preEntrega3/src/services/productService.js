import ProductDao from '../dao/productMongoDao.js';

export default class ProductService {
  static getProducts(filter = {}) {
    return ProductDao.getProducts(filter);
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
