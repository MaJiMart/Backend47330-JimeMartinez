import CartModel from "../models/cartModel";
import { Exception } from "../utilities";

export default class CartsManager {
    static getCarts(query = {}) {
        return CartModel.find(query)
    }

    static async getCartById (cid) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Exception(`No encontramos el carrito con ID: ${cid}`, 404);
        }
    }

    static async creatCart (data) {
        const cart = await CartModel.create(data);
        console.log('Carrito creado con éxito')
        return cart
    }

    static async updateCart(cid, data){
        const cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Exception(`No encontramos el carrito con ID: ${cid}`, 404);
        }
        const criteria = { _id: cid };
        const operation = { $set: data };
        await CartModel.updateOne (criteria, operation);
        console.log('Carrito actualizado correctamente');
    }

    static addProductToCart(cid, pid) {

    }

    static deleteProductToCart (cid, pid){

    }


    static async deleteCart(cid) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Exception(`No encontramos el carrito con ID: ${cid}`, 404);
        }
        const criteria = { _id: cid };
        await CartModel.deleteOne(criteria);
        console.log('El carrito fue eliminado');
    }
}