import ProductModel from '../models/productModel.js';
import { Exception } from '../utilities.js';

export default class ProductsDao {
  static getProducts(criteria = {}) {
    return ProductModel.find(criteria);
  }

  static getProdById(pid) {
    return ProductModel.findById({ _id: pid });
  }

  static async createProduct(product) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = product;

    const newProduct = new ProductModel({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    });
    const createdProduct = await newProduct.save();
    console.log('Successfully created product');
    return createdProduct;
  }

  static async updateProduct(pid, data) {
    const updatedProduct = await ProductModel.updateOne(
      { _id: pid },
      { $set: data }
    );
    if (updatedProduct.modifiedCount === 0) {
      throw new Exception(`NOT FOUND: Product with ID: ${pid} not found`, 404);
    }
    return console.log('Product updated successfully');
  }

  static async deleteProduct(pid) {
    const deletedProduct = await ProductModel.deleteOne({ _id: pid });

    if (deletedProduct.deletedCount === 0) {
      throw new Exception(`NOT FOUND: Product with ID: ${pid} not found`, 404);
    }
    return console.log('Product successfully removed');
  }
}
