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

Finalmente probamos que todo anda bien con Postman así que realizamos un CRUD de un producto.

## Conclusiones

Y de esta forma vimos como crear módulos.


## El siguiente video

Como vimos en el código del controlador podríamos modularizar mas funciones pero también podríamos realizar esta modularización atraves de middlewares, así que en el siguiente video veremos como crear un middlwware que valide la imagen antes de realizar la petición.

## Despedida

Y eso a sido todo por el video de hoy si te a servido no te olvides de darle click al botón de me gusta, suscríbete a mi canal si te gusta mi contenido y activar las notificaciones para que YouTube te avise cuando suba un nuevo video, soy Oliver zulett desarrollador web y nos vemos en el siguiente video.