## Presentación:

Muy buenas a todos bienvenidos otra vez a mi canal hoy continuamos con otro video mas de hagamos una API.

## Introducción:

Hoy terminamos con las peticiones a modelos y terminaremos con el modelo de datos para las ordenes de productos.

Comencemos.

## Desarrollo

### models/order.model.ts

comenzamos creando el modelo de datos.

`creamos el modelo de datos de order.model.ts` 

### routes/orders.routes.ts

una vez que creamos el modelo de datos creamos el enrutador que gestionara las peticiones.

`creamos el modelo de datos de orders.routes.ts` 

### app.ts

Ahora que tenemos el enrutador lo instanciamos en el app.ts

### controllers/orders.controller.ts

Ahora comenzamos con la creacion del controlador de las peticiones para las ordenes.

### Postman

Finalmente levantamos el servidor y probamos las operaciones CRUD sobre el modelo de pedidos en ***Postman***

`creamos una nueva carpeta en postman que guardara todas las peticiones de usuarios`

## Conclusiones

Y de esta forma creamos las peticiones al modelo de datos de pedidos, vimos como embeber documentos y filtrar datos por consultas.

## El siguiente video

Y con esto podriamos dar por terminado la creacion basica de una API pero si es que fueron un poco perseptivos se daran cuenta que esta API no tiene preteccion alguna que nos asegure la integridad de los datos ya que si subiriamos esta API a cualquier servidor o servicio en la nube cualquier persona con un programa parecido a postman o desde cualquier navegador web podria acceder a nuestra API y ejecutar procesos CRUD sobre cualquier modelo de datos y por ende corromper la integridad de nuestra vase de datos.

Es por eso que en el siguiente video nos eseguraremos que nuestra API mantenga la integridad de los datos a travez de JWT.

## Despedida

Y eso a sido todo por el video de hoy si te a servido no te olvides de darle click al botón de me gusta, suscríbete a mi canal si te gusta mi contenido y activar las notificaciones para que YouTube te avise cuando suba un nuevo video, soy Oliver zulett desarrollador web y nos vemos en el siguiente video.