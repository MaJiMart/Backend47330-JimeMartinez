# Esta es la carpeta donde se subirán los desafíos semanales del curso.
<p>
A continuación describiré de qué se trata cada desafío a medida que los vaya subiendo 🤓
</p>

_❗Para ver el código de cada desafío revisa la carpeta que tiene el mismo nombre que el título._

## 📌class02Challenge: "Clases con ECMAScript y ECMAScript avanzado"

<p>✔️ Se creará una instancia de la clase “ProductManager”</p>
<p>✔️ Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []</p>
<p>✔️ Se llamará al método “addProduct” con los campos:</p>
    <p>title: “producto prueba”</p>
    <p>description:”Este es un producto prueba”</p>
    <p>price:200,</p>
    <p>thumbnail:”Sin imagen”</p>
    <p>code:”abc123”,</p>
    <p>stock:25</p>
<p>✔️ El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE</p>
<p>✔️ Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado</p>
<p>✔️ Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.</p>
<p>✔️ Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

</p>

## 📌class04Challenge: "Manejo de archivos"

<p>✔️Se creará una instancia de la clase “ProductManager”</p>
<p>✔️Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []</p>
<p>✔️Se llamará al método “addProduct” con los campos:</p>
    <p>title: “producto prueba”</p>
    <p>description:”Este es un producto prueba”</p>
    <p>price:200,</p>
    <p>thumbnail:”Sin imagen”</p>
    <p>code:”abc123”,</p>
    <p>stock:25</p>
<p>✔️El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE</p>
<p>✔️Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado</p>
<p>✔️Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.</p>
<p>✔️Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.</p>
<p>✔️Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.

</p>

## 📌class06Challenge: "Servidores con Express"

<p>Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.

</p>
<p>✔️Se instalarán las dependencias a partir del comando npm install</p>
<p>✔️Se echará a andar el servidor</p>
<p>✔️Se revisará que el archivo YA CUENTE CON AL MENOS DIEZ PRODUCTOS CREADOS al momento de su entrega, es importante para que los tutores no tengan que crear los productos por sí mismos, y así agilizar el proceso de tu evaluación.</p>
<p>✔️Se corroborará que el servidor esté corriendo en el puerto 8080.</p>
<p>✔️Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.</p>
<p>✔️Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.</p>
<p>✔️Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.</p>
<p>✔️Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
</p>
<p>⚙️ Dependencias:</p>
    <p>express: "4.18.2"

</p>

## 📌class10Challenge: "Websockets and Handlebars"

<p>✔️Se instalará y correrá el servidor en el puerto indicado.</p>
    <p>El servidor debe levantarse sin problema.</p>
<p>✔️Se abrirá la ruta raíz:</p>
    <p>Debe visualizarse el contenido de la vista index.handlebars</p>
    <p>No se debe activar el websocket aún.</p>
<p>✔️Se buscará en la url del navegador la ruta “/realtimeproducts”.</p>
    <p>Se corroborará que el servidor haya conectado con el cliente, en la consola del servidor deberá mostrarse un mensaje de “cliente conectado”.</p>
    <p>Se debe mostrar la lista de productos y se corroborará que se esté enviando desde websocket.
</p>
<p>⚙️ Dependencias:</p>
    <p>express: "4.18.2"</p>
    <p>express-handlebars: "^7.1.2"</p>
    <p>socket.io: "^4.7.2"

</p>

## 📌class19Challenge: "Implementación de login"

<p>Ajustar nuestro servidor principal para trabajar con un sistema de login.
</p>
<p>Aspectos a incluir:</p>
<p>✔️ Deberá contar con todas las vistas realizadas en el hands on lab, así también como las rutas de router para procesar el registro y el login.</p>
<p>✔️ Una vez completado el login, realizar la redirección directamente a la vista de productos.</p>
<p>✔️ Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario.</p>
<p>✔️ Agregar un sistema de roles, de manera que si colocamos en el login como correo adminCoder@coder.com, y la contraseña adminCod3r123, el usuario de la sesión además tenga un campo.</p>
<p>✔️ Todos los usuarios que no sean admin deberán contar con un rol “usuario”.</p>
<p>✔️ Implementar botón de “logout” para destruir la sesión y redirigir a la vista de login.
</p>
<p>⚙️ Dependencias:</p>
    <p>connect-mongo: "^5.1.0",</p>
    <p>express: "^4.18.2",</p>
    <p>express-handlebars: "^7.1.2",</p>
    <p>express-session: "^1.17.3",</p>
    <p>mongoose: "^8.0.0",</p>
    <p>mongoose-paginate-v2: "^1.7.4",</p>
    <p>session-file-store: "^1.5.0"

</p>

## 📌class21Challenge: "Refactor a nuestro login"

<p>Con base en el login de nuestro entregable anterior, refactorizar para incluir los nuevos conceptos.
</p>
<p>Aspectos a incluir:</p>
<p>✔️ Se deberá contar con un hasheo de contraseña utilizando bcrypt.</p>
<p>✔️ Se deberá contar con una implementación de passport, tanto para register como para login.</p>
<p>✔️ Implementar el método de autenticación de GitHub a la vista de login.
</p>
<p>⚙️ Dependencias:</p>
    <p>bcrypt: "^5.1.1",</p>
    <p>connect-mongo: "^5.1.0",</p>
    <p>express: "^4.18.2",</p>
    <p>express-handlebars: "^7.1.2",</p>
    <p>express-session: "^1.17.3",</p>
    <p>mongoose: "^8.0.1",</p>
    <p>mongoose-paginate-v2: "^1.7.4",</p>
    <p>passport: "^0.6.0",</p>
    <p>passport-github2: "^0.1.12",</p>
    <p>passport-local: "^1.0.0"

</p>