const fs = require('fs');
const path = require('path');

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
    const id = generateID()    
    const newProduct = { id, title, description, price, thumbnail, code, stock };
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

//Crear producto
(async function(run){
    
    if (!run) return;
    
    const productsManager = new ProductsManager('./products.json')
    
    await productsManager.createProduct({
        title: 'producto prueba',
        description: 'Este es otro producto prueba más',
        price: 500,
        thumbnail: 'Sin imagen',
        code: 'xyz123',
        stock: 5,
    });
    
    const products = await productsManager.getProduct();
    console.log('🔍 Los productos encontrados son:', products)
})(false);

//Buscar producto por Id
(async function(run){
        
    if (!run) return;
    
    const productsManager = new ProductsManager('./products.json')
    
    try {
        const productId = '1'; // Reemplaza con el ID del producto que deseas buscar
        const product = await productsManager.getProductById(productId);
        console.log(`🔍 El producto con id ${productId} que buscas es: `, product);
    } catch (error) {
        console.error('😓 SORRY! Product not found');
    }
})(false);

//Actualizar producto
(async function (run) {
    if (!run) return;
    
    const productsManager = new ProductsManager('./products.json')
    
    try {
        const productIdToUpdate = '9'; // Reemplaza con el ID del producto que deseas actualizar
        const updatedProduct = {
            id: productIdToUpdate,
            title: 'Producto actualizado', // reemplazar 
            description: 'Este es el producto actualizado',// reemplazar
            price: 750, // reemplazar
            thumbnail: 'Nueva imagen', // reemplazar
            code: 'abf756', // reemplazar
            stock: 100, // reemplazar
        };

        await productsManager.updateProduct(productIdToUpdate, updatedProduct);
        console.log(`✅ El producto con ID ${productIdToUpdate} fue actualizado con éxito.`);
        
        const products = await productsManager.getProduct();
        console.log('El producto actualizados es:', updatedProduct);
    } catch (error) {
        console.error('😓 Error al actualizar el producto:', error.message);
    }
})(false);

//Eliminar producto
(async function (run) {
    if (!run) return;

    const productsManager = new ProductsManager('./products.json')
    
    try {
        const productIdToDelete = '9'; // Reemplaza con el ID del producto que deseas eliminar
        await productsManager.deleteProduct(productIdToDelete);
        console.log(`✅ El producto con ID ${productIdToDelete} fue eliminado con éxito.`);
        
        const products = await productsManager.getProduct();
        console.log('La lista actualizada de productos es:', products);
    } catch (error) {
        console.error('😓 ERROR! No pudimos eliminar el producto:', error.message);
    }
})(true);

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

function generateID(){
    let d= new Date().getTime();
    let id = 'xxxxxxxxxx'.replace(/[xy]/g, function (c){
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r: (r & 0x3 | 0x8)).toString(16);
    })
    return id
};