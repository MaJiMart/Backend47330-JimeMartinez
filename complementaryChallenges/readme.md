# Esta es la carpeta donde se subirán los desafíos complementarios del curso.
<p>
A continuación describiré de qué se trata cada desafío a medida que los vaya subiendo 🤓
</p>

_❗Para ver el código de cada desafío revisa la carpeta que tiene el mismo nombre que el título._

## 📌integrativePractice1: "Proyecto ecommerce"

<br>Consigna:</br>
<p>Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:</p>

<p>✔️Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto.</p>

<p>✔️Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones “carts”, “messages”, “products” y sus respectivos schemas.</p>

<p>✔️Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta “dao”. Dentro de dao, agregar también una carpeta “models” donde vivirán los esquemas de MongoDB. La estructura deberá ser igual a la vista en esta clase</p>
    
<p>✔️Contener todos los Managers (FileSystem y DB) en una carpeta llamada “Dao”</p>

<p>✔️Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem</p>

<p>✔️Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita implementar un chat como el visto en clase. Los mensajes deberán guardarse en una colección “messages” en mongo (no es necesario implementarlo en FileSystem). El formato es: {user:correoDelUsuario, message: mensaje del usuario}</p>

<p>✔️Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.
</p>

<p>⚙️ Dependencias:</p>
    <p>express: "4.18.2"</p>
    <p>express-handlebars: "^7.1.2"</p>
    <p>mongoose: "^7.6.3"</p>
    <p>socket.io: "^4.7.2"

</p>