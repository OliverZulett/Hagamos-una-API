## Presentación:

Muy buenas a todos bienvenidos otra vez a mi canal hoy continuamos con otro video mas de hagamos una API.

## Introduction:

Hoy nos toca modularizar algunas funciones que estamos reutilizando para evitar que nuestros controladores tengan código spaguetti. Comencemos.

## Desarrollo

### controllers/products.controller.ts

Si damos un vistazo al código de este controlador nos damos cuenta que tenemos dos funciones que podríamos modularizar la primera que es la función que envían respuestas a peticiones.

### functions/statusResponse.function.ts

comenzamos creando un directorio llamado functions donde guardaremos estos módulos, y creamos la primera función que llamaremos statusResponse.function.ts, ahora si volvemos a nuestro controlador y analizamos la estructura de las respuestas que enviamos vemos que necesitamos de 5 parámetros que son: la respuesta, el código de respuesta, el mensaje de respuesta, el error si es que hay alguno y los objetos de respuesta,

Así que en el modulo que estamos creando escribimos la función.

### controllers/products.controller.ts

una vez escrita la función volvemos los controlador y reemplazamos las respuesta por el modulo.

Volviendo a revisar el controlador también seria buena idea modularizar la función de guardar la imagen luego de validarla.

### functions/saveFile.function.ts

Así que creamos el modulo para guardar archivos vamos a la carpeta functions y creamos la función saveFile dentro creamos la función.

### controllers/products.controller.ts

Volvemos al controlador y reemplazamos instanciamos el módulo.

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