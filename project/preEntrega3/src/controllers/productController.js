import ProductService from '../services/productService.js';
import { Exception, NotFound } from '../utilities.js';

export default class ProductController {
  static async getProducts(query = {}) {
    return await ProductService.getProducts(query);
  }

  static async getProdById(pid) {
    const product = await ProductService.getProducts({ _id: pid });
    if (!product) {
      throw new NotFound(
        `NOT FOUND: Product with ID: ${pid} not found`);
    }
    return 
  }

  static async createProduct(data) {
    try {
      return await ProductService.createProduct(data);
    } catch (error) {
      throw new Exception(`Error creating product: ${error.message}`, 500);
    }
    
  }

  static async updateProduct(pid, data) {
    try {
      return await ProductService.updateProduct(pid, data);
    } catch (error) {
      throw new Exception(
        `Error updating product: ${error.message}`,
        500
      );
    }
  }

  static async deleteProduct(pid) {
    try {
      return await ProductService.deleteProduct(pid);
    } catch (error) {
      throw new Exception(`Error deleting product: ${error.message}`, 500);
    }
    
  }
}
