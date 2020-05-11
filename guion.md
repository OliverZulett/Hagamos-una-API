## Presentación:

Muy buenas a todos bienvenidos otra vez a mi canal hoy continuamos con otro video mas de hagamos una API.

## Introducción:

En el video de hoy veremos como crear un middleware, un middleware en síntesis es una función que se ejecuta antes de realizar operaciones dentro de una petición y vienen bien para realizar validaciones. 

Así que hoy escribiremos un middleware que verifique que los archivos que subimos al servidor al memento de crear un nuevo producto sean de tipo imagen, genere un nombre de archivo, que obtenga su extensión y la ruta donde guardara el archivo.

Comencemos.

## Desarrollo

### middlewares

Primero creamos el folder que contendrá todos nuestros middlewares de aquí en adelante:

`creamos  la carpeta middlewares` 

ahora creamos nuestro primer middleware llamado:

`imageValidator.middleware.ts`

### middlewares/imageValidator.middleware.ts

dentro del middleware nos creamos la función que validara los parámetro del los archivos que se suban al servidor pero ya que es un proceso similar al que tenemos escrito en el controlador de producto pues re utilizamos código:

`reutilizamos el codigo que valida la imagen y agregamos el código que falte`

### controllers/products.controller.ts

Una vez creado el middleware debemos modificar la lógica en la que se guardaba la imagen anteriormente:

`modificamos el código que guardaba la imagen`

### functions/saveFile.function.ts

Y también podríamos modificar la función de guardar archivo para hacer esto de manera mas dinámica y en vez de pasarle tantos parámetros simplemente le pasamos el parámetro ***req*** y ***res*** ya que en en el ***req*** donde ahora se encuentran parámetros como el nombre del archivo y el ***path*** donde guardaremos la imagen:

`modificamos el código que guardaba la imagen`

### routes/products.routes.ts

Una vez creado el middleware, modificado el controlador y modificado el modulo que guardara la imagen inyectamos el middleware en el enrutador que instancie la petición ***POST***:

`inyectamos el middleware`

### Postman

Finalmente probamos que todo anda bien con ***Postman*** así que creamos un nuevo producto y además verificamos en que casos fallaría el middleware y vemos como responde nuestra API.

### middlewares/imageValidator.middleware.ts

Ahora tenemos que modificar nuestro middleware para que pueda funcionar cuando actualizamos productos y no solo cuando los creamos.

Para ello utilizaremos el método ___res.method___ que verificara que tipo de petición estamos recibiendo y sabiendo que tipo de petición es podremos diferenciar si vamos a dejar la petición sin importar si haya o no una imagen ósea cada que envíen peticiones ***PUT***. 

`agregamos la validacion del metodo de petición`

### functions/updateFile.function.ts

También debemos crearnos un modulo que nos permita actualizar imágenes teniendo en cuenta eventos como que pasaría si la imagen del servidor esta corrupta o no existe, este modulo sera similar al que guarda imagen por lo que podríamos reutilizar algo de código.

`Creamos el update file y reutilizamos codigo del saveFile` 

### controllers/products.controller.ts

Ahora modificaremos el método ***updateProduct*** del controlador de productos para que actualice las imágenes por el modulo de ***updateImage***:

`modificamos el código que actualizaba la imagen`

### routes/products.routes.ts

Una vez creado el middleware, modificado el controlador y modificado el modulo que actualizara la imagen inyectamos el middleware en el enrutador que instancie la petición ***PUT***:

`inyectamos el middleware en el metodo PUT`

### Postman

Finalmente probamos que todo anda bien con ***Postman*** así que actualizamos un producto y además verificamos en que casos fallaría el middleware y vemos como responde nuestra API.

## Conclusiones

Y de esta forma vimos como crear un middleware, como inyectarlo en un enrutador y convertimos mas de 200 líneas de código en menos de 100.


## El siguiente video

Y con este video ya creamos la estructura base completa de nuestra API ahora solo nos quedan crear los modelos, enrutadores y controladores de las demás entidades tarea que se nos facilitara enormemente ahora que tenemos un código mas funcional y simplificado gracias a los módulos y a los middlewares.

## Despedida

Y eso a sido todo por el video de hoy si te a servido no te olvides de darle click al botón de me gusta, suscríbete a mi canal si te gusta mi contenido y activar las notificaciones para que YouTube te avise cuando suba un nuevo video, soy Oliver zulett desarrollador web y nos vemos en el siguiente video.