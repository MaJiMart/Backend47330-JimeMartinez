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

## preEntrega2: 

<p>Profesionalizando la BD
</p>
<p>📋 Objetivos generales:</p>
<p>✔️ Contarás con Mongo como sistema de persistencia principal</p>
<p>✔️ Tendrás definidos todos los endpoints para poder trabajar con productos y carritos
</p>
<p>📋 Objetivos específicos:</p>
<p>✔️ Profesionalizar las consultas de productos con filtros, paginación y ordenamientos</p>
<p>✔️ Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos
</p>
<p>Se debe entregar:</p>
<p>✔️ Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:</p>
    <p>Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional):</p>
        <p>● Limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.</p>
        <p>● Page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1</p>
        <p>● Query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general</p>
        <p>● Sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento</p>
<p>✔️ El método GET deberá devolver un objeto con el siguiente formato:
    <p>{</p>
    <p>status:success/error</p>
    <p>payload: Resultado de los productos solicitados</p>
    <p>totalPages: Total de páginas</p>
    <p>prevPage: Página anterior</p>
    <p>nextPage: Página siguiente</p>
    <p>page: Página actual</p>
    <p>hasPrevPage: Indicador para saber si la página previa existe</p>
    <p>hasNextPage: Indicador para saber si la página siguiente existe.</p>
    <p>prevLink: Link directo a la página previa (null si hasPrevPage=false)</p>
    <p>nextLink: Link directo a la página siguiente (null si hasNextPage=false)</p>
    <p>}</p>
</p>
<p>✔️ Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.</p>
<p>✔️ Además, agregar al router de carts los siguientes endpoints:</p>
    <p>● DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.</p>
    <p>● PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.</p>
    <p>● PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body</p>
    <p>● DELETE api/carts/:cid deberá eliminar todos los productos del carrito </p>
    <p>● Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.</p>
<p>✔️ Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:</p>
    <p>● Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.</p>
    <p>● Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.</p>
<p>✔️ Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito.</p>   
