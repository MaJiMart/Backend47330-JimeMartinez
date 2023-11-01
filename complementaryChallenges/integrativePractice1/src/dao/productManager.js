import ProductModel from "../models/productModel";

export default class ProductsManager {
    static getProduct(query = {}) {
        return ProductModel.find(query)
    }

    static async getProductById(pid){
        const product = await ProductModel.findById(pid);
        if (!product){
            throw new Error(`Producto con ID: ${id} no encontrado`)
        }
    }

    static async createProduct(data){
        const product = await ProductModel.create(data);
        console.log('Producto creado con éxito');
        return product
    }

    static async updateProduct(pid, data) {
        const product = await ProductModel.findById(pid);
        if (!product){
            throw new Error(`Producto con ID: ${id} no encontrado`)
        }
        const criteria = { _id: pid };
        const operation = { $set: data };
        await ProductModel.updateOne (criteria, operation);
        console.log('Producto actualizado correctamente');
    }

    static async deleteProduct(pid) {
        const product = await ProductModel.findById(pid);
        if (!product){
            throw new Error(`Producto con ID: ${id} no encontrado`)
        }
        const criteria = { _id: pid };
        await ProductModel.deleteOne(criteria);
        console.log('Producto actualizado correctamente');
    }
}