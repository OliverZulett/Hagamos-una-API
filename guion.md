## Presentación:

Muy buenas a todos bienvenidos otra vez a mi canal hoy continuamos con otro video mas de hagamos una API.

## Introducción:

Ahora que ya tenemos la estructura base completada es momento de realizar las peticiones de los modelos de datos restantes, asi que hoy comenzaremos con el modelo de datos de usuarios.

Comencemos.

## Desarrollo

### models/user.model.ts

Lo primero que tenemos que hacer es crear el modelo de datos de usuarios para lo cual tenemos que obtenemos los parametros o campos que necesitaremos para guardar a los usuarios en la base de datos, estos parametros los obtendremos de la lista de requerimientos y podriamos reutilizar algo de código del modelo de datos de productos.

`creamos el modelo de datos de usuarios` 

`obtenemos los parametro que necesitamos de la lista de requerimientos`

`reutilizamos codigo del modelo de productos`

Ahora si bien necesitamos parametros adicionales como el nit el numero de telefono o la direccion, tenemos que tener en cuenta que estos parametros podrian varias por pedido ya que quiza un cliente haga un pedido para otra persona por lo que su nit y direccion sean diferentes al del mismo usuario. asi que deberian setearse parametros nuevos en cada pedido pero desde el front end y para no tener que re ingresar los datos cada vez se podria utilizar el local storage desde el front end.

### routes/users.routes.ts

Ahora creamos la estructura del enrutador que gestionara las peticiones cuya estructura sera similar al enrutador de productos por lo cual reutilizamos algo de codigo:

`creamos un nuevo enrutador en /routes llamado users.routes.ts`

### controllers/users.controller.ts

Una vez creado el enrutador procedemos a crear el controlador de usuarios que realizara las operaciones CRUD, tambien nos basaremos en la estructura del controlador de productos para crear este controlador

`creamos un nuevo controlador en /controllers llamado users.controllers.ts`

y adaptamos el codigo del controlador de productos.

`reutilizamos el código el controlador de productos`

**Consideraciones**

* ***createUSer*** tenemos que considerar que al momento de crear usuarios tenemos que verificar que realmente nos pasen dos parametros que son el email y la contraseña" ademas que esta deberemos de encriptarla para mas seguridad por lo que instalamos un modulo de node llamado ***bcrypt***
  
`instalamos bcrypt y su tipado de datos`

* encripttamos la contraseña
* ***getUserBiId*** ocultamos la contraseña al devolver el usuario


### routes/users.routes.ts

Una vez terminado el controlador ahora lo importamos en el enrutador

### app.ts

y luego importamos el enrutador en el app.ts

### assets/

Ahora que ya vamos a tener dos tipos imagenes las de productos y las de usuarios, seria ideal setear una imagen por defecto para cada uno y estas iran dentro de una carpeta llamada assets dentro de la carpeta src ya que por lo general toda carpeta que no sea ni src o dist se sube al servidor ya que la carpeta uploads deberia crearse con el primer producto o usuario que creemos.

`creamos la carpeta assets`

dentro de la carpeta assets copio una imagen por defecto para usuarios y productos

`copio imagenes por defecto`

tambien deberemos crear un comando en el packeje.json que nos permita copiar la carpeta de assets dentro de la carpeta dist ya que al momento de crearse la carpeta dist luego de transpilarse el codigo a js no tomara en cuenta la carpeta assets por que no contiene codigo typescript.

`creamos un comando en el packege.json` 

### controllers/image.controller.ts

ahora modificamos el controlador de imagenes para validar cuando debera usar uno u otra.

`modificamos el controlador de imagenes`

### Postman

Finalmente levantamos el servidor y probamos las operaciones CRUD sobre el modelo de usuarios en ***Postman***

`creamos una nueva carpeta en postman que guardara todas las peticiones de usuarios`

## Conclusiones

Y de esta forma creamos las peticiones al modelo de datos de usuarios.

## El siguiente video

En el siguiente video crearemos el modelo de datos y las peticiones para ordenes.

## Despedida

Y eso a sido todo por el video de hoy si te a servido no te olvides de darle click al botón de me gusta, suscríbete a mi canal si te gusta mi contenido y activar las notificaciones para que YouTube te avise cuando suba un nuevo video, soy Oliver zulett desarrollador web y nos vemos en el siguiente video.