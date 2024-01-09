import ProductDTO from '../dto/productDto.js';

export default class ProductRepository{
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts(criteria = {}) {
    const products = await this.dao.getProducts(criteria)
    return products
  }

  async createProduct(data) {
    return new ProductDTO(await this.dao.createProduct(data))
  }

  async updateProduct(pid, data) {
    return await this.dao.updateProduct(pid, data)
  }

  async deleteProduct(pid) {
    return await this.dao.deleteProduct(pid)
  }
}