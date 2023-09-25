const fs = require("fs");
const path = require("path");

class ProductsManager {
    constructor(path) {
    this.path = path;
    }

    async createProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock){
            throw new Error ('Por favor, complete todos los campos.')
        }
        const products = await getJSONFromFile(this.path);
        const id = products.length + 1;
        const newProduct = { id, title, description, price, thumbnail, code, stock };
        products.push(newProduct);

        return saveJSONToFile(this.path, products)
    }

    getProduct() {
        return getJSONFromFile(this.path)
    }
}

//Utilities
const fileExist = async (path) => {
    try {
        await fs.promises.access(path);
        return true;
    } catch (error) {
        return false
    }
};

const getJSONFromFile = async (path) => {
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
};

const saveJSONToFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t')
    try {
        await fs.promises.writeFile(path, content, 'utf-8');
    } catch (error) {
        throw new Error (`El archivo ${path} no pudo ser escrito`);
    }
};

(async function(run){

    if (!run) return;
    
    const productsManager = new ProductsManager('./products.json')
    
    await productsManager.createProduct({
        title: 'producto prueba 4',
        description: 'Este es el cuarto producto prueba',
        price: 500,
        thumbnail: 'Sin imagen',
        code: 'xyz123',
        stock: 5,
    });
    
    const products = await productsManager.getProduct();
    console.log('🔍 Los productos encontrados son:', products)

})(true);
