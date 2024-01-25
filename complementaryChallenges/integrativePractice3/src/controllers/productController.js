import ProductService from '../services/productService.js';
import { Exception, NotFound } from '../utilities.js';

export default class ProductController {
  static async getProducts(query = {}) {
    const filter = {};
    const opts = {
      page: query.page || 1,
      limit: query.limit || 10,
    };
    if (query.sort) {
      opts.sort = query.sort;
    }
    if (query.status) {
      filter.status = query.status;
    }
    if (query.category) {
      filter.category = query.category;
    }
  
    return await ProductService.getProducts(filter, opts);
  }

  static async getProdById(pid) {
    const product = await ProductService.getProduct(pid);
    if (!product) {
      throw new NotFound(`NOT FOUND: Product with ID: ${pid} not found`);
    }
    return product;
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
      await ProductController.getProdById(pid);
      await ProductService.updateProduct(pid, data);
    } catch (error) {
      throw new Exception(`Error updating product: ${error.message}`, 500);
    }
  }

  static async deleteProduct(pid) {
    try {
      await ProductController.getProdById(pid);
      await ProductService.deleteProduct(pid);
    } catch (error) {
      throw new Exception(`Error deleting product: ${error.message}`, 500);
    }
  }
}
