import ProductModel from '../models/productModel.js';
import { NotFound } from '../utilities.js';

export default class ProductsDao {
  getProducts(criteria = {}) {
    return ProductModel.find(criteria);
  }

  createProduct(data) {
    return ProductModel.create(data);
  }

  updateProduct(pid, data){
    return ProductModel.updateOne({ _id: pid }, { $set: data });
  }

  deleteProduct(pid) {
    return ProductModel.deleteOne({ _id: pid})
  }
}
