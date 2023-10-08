import fs from 'fs';
import { getJSONFromFile, saveJSONToFile, generateID } from '../utilities.js';

class ProductsManager {
    constructor(path) {
    this.path = path;
}

async createProduct(product) {
    const { title, description, code, price, status, stock, category, thumbnail } = product;
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail){
        throw new Error ('Por favor, complete todos los campos.')
    }
    const products = await getJSONFromFile(this.path);
    const id = generateID()    
    const newProduct = { id, title, description, code, price, status, stock, category, thumbnail };
    products.push(newProduct);
    
    return saveJSONToFile(this.path, products)
}

getProduct() {    
    return getJSONFromFile(this.path);
}

async getProductById(id) {
    const products = await getJSONFromFile(this.path);
    const product = products.find((product) => product.id === id);
    if (!product) {
        throw new Error(`No se encontró un producto con el ID ${id}`);
    }
    return product;
}

async updateProduct(id, updatedProduct) {
    const products = await getJSONFromFile(this.path);
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        throw new Error(`No se encontró el producto con el ID ${id}`);
    }

    products[index] = updatedProduct;

    await saveJSONToFile(this.path, products);
}

async deleteProduct(id) {
    const products = await getJSONFromFile(this.path);
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        throw new Error(`Producto con ID ${id} no encontrado`);
    }

    products.splice(index, 1);

    await saveJSONToFile(this.path, products);
}
}

//Utilities
/* const fileExist = async (path) => {
    try {
        await fs.promises.access(path);
        return true;
    } catch (error) {
        return false
    }
}; */

/* const getJSONFromFile = async (path) => {
    if(!await fileExist(path)){
        return [];
    }
    let content;
    try {
        content = await fs.promises.readFile(path, 'utf-8');    
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser leído.`);
    }
    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato válido.`);
    }
}; */

/* const saveJSONToFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t')
    try {
        await fs.promises.writeFile(path, content, 'utf-8');
    } catch (error) {
        throw new Error (`El archivo ${path} no pudo ser escrito`);
    }
}; */

export default ProductsManager;