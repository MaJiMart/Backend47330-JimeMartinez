# Esta es la carpeta donde se subirán las pre-entregas del proyecto del curso de backend.
<p>
A continuación describiré de qué se trata cada entrega a medida que los vaya subiendo 🤓
</p>

_❗Para ver el código de cada pre-entrega del proyecto revisa la carpeta que tiene el mismo nombre que el título._

## preEntrega1: 
<p>
Se desarrollará un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra en el e-commerce
</p>
<p>📋 Objetivo:</p>
<p>Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:</p>
    <p>Para el manejo de productos, el cual tendrá su router en /api/products/, configurar las siguientes rutas:</p>
        <p>✔️ La ruta raíz GET / deberá listar todos los productos de la base. Incluyendo la limitación ?limit del desafío anterior</p>
        <p>✔️ La ruta GET /:pid deberá traer sólo el producto con el id proporcionado</p>
        <p>✔️ La ruta raíz POST / deberá agregar un nuevo producto con los campos:</p>
            <p>id: Number/String</p>
            <p>title:String</p>
            <p>description:String</p>
            <p>code:String</p>
            <p>price:Number</p>
            <p>status:Boolean (Por defecto true)</p>
            <p>stock:Number</p>
            <p>category:String</p>
            <p>thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto (campo NO obligatorio)</p>
        <p>✔️ La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.</P>
        <p>✔️ La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.
        </p>
    <p>Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:</p>
        <p>✔️ La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:</p>
            <p>id:Number/String</p>
            <p>products: Array que contendrá objetos que representen cada producto</p>
        <p>✔️ La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.</p>
        <p>✔️ La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:</p>
            <p>product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO</p>
            <p>quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno. Si el producto ya existente intenta agregarse nuevamente, incrementar el campo quantity de dicho producto
            </p>
    <p>La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.
No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.
</p>
<p>⚙️ Dependencias:</p>
    <p>express: "4.18.2"
</p>
