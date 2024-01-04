import { productRepository } from '../repositories/index.js';

export default class ProductService {
  static getProducts(filter = {}) {
    return productRepository.getProducts(filter);
  }

  static createProduct(payload) {
    const product = productRepository.createProduct(payload);
    return product
  }

  static updateProduct(pid, payload) {
    return productRepository.updateProduct(pid, payload);
  }

  static deleteProduct(pid) {
    return productRepository.deleteProduct(pid);
  }
}
