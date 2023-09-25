class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    };

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.some((product) => product.code === code)) {
            throw new Error('❌ UPS! Lo sentimos, ese producto ya existe, no podemos agregarlo.');
    }


    const product ={
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };

    this.products. push (product);
    }

    getProductById (id) {
        let product = this.products.find ((product) => product.id === id);
        if (!product){
            throw new Error ('🔮SORRY! Product not found');
        }
        return product;
    }
}

const productManager = new ProductManager();

//Array vacío
const products = productManager.getProducts();
console.log(products);

//Agregar producto
const productId = productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
);

//Ver producto agregado
const updatedProducts = productManager.getProducts();
console.log(updatedProducts);

//Comprobar error por producto repetido
try {
    productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
    );
} catch (error) {
    console.error(error);
}

//Buscar producto por id
const foundProduct = productManager.getProductById(5); 