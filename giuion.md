## Presentación:

Muy buenas a todos bienvenidos otra vez a mi canal hoy continuamos con otro video mas de hagamos una API.

## Introduction:

en el anterior video habíamos visto cómo subir imágenes al servidor, actualizarlas y también eliminarlas, ahora nos tocaría ver la manera en la que podemos mostrarlas, ya que al momento de subir la imagen, el nombre de la imagen y su extensión se guardan en la base de datos mientras que el archivo se guarda en algún lugar en nuestro servidor, pero este archivo no puede ser accedido desde ningún lugar.
Por lo que ahora vamos a ver la manera en la que podemos enviar esas imágenes como respuestas de peticiones. Comencemos.

## Desarrollo

### app.ts

Lo primero que debemos hacer es crearnos un nuevo enrutador  en el app.ts ya que tendremos  imágenes tanto para usuarios como para productos.

Así que abrimos nuestro archivo app.ts nos vamos a la sección de enrutadores y declaramos un nuevo enrutador escribiendo app.use y le pasamos los parámetros de middleware que será la ruta la cual llamaremos / imagesy el enrutador imageRouter  que crearemos a continuación.

###  routes/

Ahora abrimos la carpeta router y dentro de ella creamos un archivo llamado image.routes.ts dentro de la cual primero importamos el router de express y luego declaramos una constante llamada ImageRouter que instanciara a un nuevo enrutador, luego utilizamos el método get sobre el enrutador que  devolverá  la imagen. para ello escribimos   imageRouter.get y entre paréntesis le pasamos la ruta que constara de dos parámetros, uno que será el  tipo de imagen y el segundo que será el  nombre de la imagen y escribimos /:type/:image, a continuación le pasamos el controlador de esta ruta y escribimos imageController.getImage.
Finalmente exportamos el enrutador como modulo y escribimos export default imageRouter.

### controllers/

Ahora creamos el controlador que nos devolverá la imagen del servidor para ello nos vamos a la carpeta controllers y creamos un archivo llamado images.controller.ts dentro del cual crearemos una constante  llamada imagecontroller que será un objeto que contendrá los controladores de la imagen. 

Dentro del objeto creamos una función asíncrona que devolverá la imagen. escribimos async getImage y entre paréntesis le pasamos el req que será de tipo request coma el res que será de tipo response importamos los modulos request y response.
dentro de esta función tenemos que obtener el tipo de imagen y el nombre de la misma, entonces declaramos una constante llama type  igual a req.paramas.type y otra constante llamada image que será igual a req.params.image. También tenemos que encontrar la ubicación de la imagen por lo cual importamos el modulo path de node y escribimos import path from 'path', declaramos una constante llamada pathImage que instanciara el path y utilizaremos su funcion .resolve que lo que hace es encontrar el path de nuestra API dentro del servidor y entre paréntesis le pasamos el atributo dirname seguido de la ruta de la carpeta que contiene las imágenes dentro de la API y escribimos con templates literales ../../uploads/${types}/${image} antes de especificarle el path e la carpeta upload subo dos niveles ya que al transpilar el código de typescript este archivo se encontrara en la ruta dist/controllers pero la carpeta uploads esta en la raiz de la API por lo que tengo que subir dos niveles para encontrar la imagen.
Ahora importamos el mudulo de fs-extra y escribimos import fs from 'fs-extra' y realizamos una validación escribiendo if entre paréntesis await e instanciamos la función fs.existsSync y entre paréntesis pathImage que lo que hará será comprobar si en verdad existe la imagen en el path que especificamos, de ser asi enviamos una respuesta con la imagen y escribimos res.sendFile y entre paréntesis le pasamos el pathImage, lo cual mostrara la imagen como respuesta a la petición de nuestros clientes.

### uploads

Ahora tenemos que pensar que pasaría si por algún motivo esta imagen se pierde en el servidor, entonces esta petición solo devolvería un error y para evitar eso seria bueno tener una imagen por defecto que devolver en caso de que la imagen solicitada no este disponible.
yo tengo una imagen por defecto que descargue previamente llamada no-image.png la cual voy a copiar en la carpeta uploads. 

### controllers/images.controller.ts

ahora volvemos a completar la validación en el controlador de la imagen y escribo else  entre corchetes declaro una nueva constante llamada pathNoImage que será igual a part.resolve y ente parentesis le paso el dirname seguido de la ruta de la imagen por defecto que será ../../uploads/no-image.png. finalmente enviamos la respuesta y escribo res.sendFile y entre paréntesis pathNoImage.

para terminar exporto este controlador como modulo y escribo export default imageController.

### app.ts

Volvemos al app.ts para importar el enrutador y escribimos import imagesRouter from './router/images.routes'.

###  routes/images.routes.ts

vamos al enrutador e importamos el controlador y escribimos import imageController from '../controllers/images.controller'.

### execute

ahora tenemos que transpilar el código y levantar el servidor así que abro la terminar y escribo npm run dev y esperamos ... 

### Postman

una vez levantado el servidor vamos a Postman, y buscamos la petición que lista todos los productos esta se encuentra  dentro de la colección de bakery-store api dentro de la carpeta products, abro la petición y la envió, de la respuesta selecciono algún producto cuya imagen este en el servidor en mi caso yo usare la imagen de torta de cumpleaños, copio el nombre de la image y su extensión abro una nueva petición que será de tipo Get y en la url escribo http://localhost:3000/images/products/ y pego el nombre de la imagen, envió la petición y eureka la imagen se muestra, guardo esta petición presionando el boton save, le doy el nombre de mostrar imagen, selecciono la colección de Bakery-store, creo una nueva carpeta llamada images y le doy al boton save to images,

### navegador

finalmente podríamos verificar si la imagen se muestra en el navegador, por lo cual copiamos la url por la cual hicimos la petición, abrimos nuestro navegador favorito y pegamos la url, presionamos enter y buala la imagen se muestra.

## Conclusiones

y de esta manera es que podemos mostrar imágenes desde nuestro servidor devolviéndolas como respuestas a peticiones de clientes.

Y con este video terminamos las peticiones sobre el modelo de productos pero aun nos faltan dos modelos mas que desarrollar.


## El siguiente video

Como mencionamos en el anterior video tenemos que modularizar algunas funciones a través de funciones globales que reutilizaremos en cada modelo de datos sobre los cuales realizaremos peticiones, por lo que en el próximo video veremos como crear módulos a partir de funciones que eviten que tengamos un código staguetti.

## Despedida

Y eso a sido todo por el video de hoy si te a servido no te olvides de darle click al botón de me gusta, suscríbete a mi canal si te gusta mi contenido y activar las notificaciones para que YouTube te avise cuando suba un nuevo video, soy Oliver zulett desarrollador web y nos vemos en el siguiente video.