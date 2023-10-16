(function (){
    const socket = io();
    
    document.getElementById('addprod').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const newProduct = {
            title: document.getElementById('titleprod').value,
            description: document.getElementById('descprod').value,
            code: document.getElementById('codeprod').value,
            price: document.getElementById('priceprod').value,
            stock: document.getElementById('stockprod').value,
            category: document.getElementById('catprod').value
        };
    
        fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .catch(error => console.error('Error al agregar el producto:', error));
    });

    document.getElementById('deleteprod').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const productId = document.getElementById('idprod').value;

        fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .catch(error => console.error('Error al eliminar el producto:', error));
    });


    fetch('api/products')
    .then(response => response.json())
    .then(products => {
            const divProducts = document.getElementById('divRealTimeProd');
            
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <p id="idprod">id: ${product.id}</p>
                `;
                divProducts.appendChild(productElement);
            });
            socket.on('productAdded', products)
        })
        .catch(error => console.error('Error al obtener los productos:', error));

})();

console.log('Hola desde el realTimeProducts.js');
