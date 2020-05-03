## Análisis de requerimientos

### Empresa: 

[Cultura cupcake](https://www.facebook.com/culturacupcake)
	
### Descripción del problema:

Crear una app que liste los productos alojados en una base de datos, 

Cualquier persona pueden ver la lista de estos productos y al seleccionar alguno podrán ver el detalle complete del mismo como ser: Nombre, precio, Ingredientes, una breve descripción de su preparación y su tiempo de entrega, imagen.

La app permite realizar pedidos, para lo cual el usuario tendrá que registrarse en el sistema con un correo electrónico y una contraseña. 

Para realizar un pedido el usuario deberá agregar el/los productos que desee a un carrito de compras, agregado todos los productos el usuario podrá realizar su pedido. Antes de realizar un pedido el usuario debe llenar un formulario que consta de tres partes:

+ datos de facturación: nombre, apellido y numero de Nit o Ci
+ datos de entrega: teléfono. dirección
+ datos de orden: Correo electrónico y notas adicionales para la preparación.

Estos datos se almacenaran en la base de datos para ser cargados de manera predeterminada en futuros pedidos, también podrán ser actualizados en cada pedido.

Al realizar el pedido el usuario podrá ver en pantalla todos los datos ingresado, la lista de productos seleccionador, el coste total además del coste total del pedido.

Los administradores o vendedores de la app tendrán habilitadas secciones especiales de la aplicación  como ser:

* Lista de pedidos listados por fecha de entrega, mediante esa lista podrán acceder a cada pedido, ver sus detalles y editar parámetros del mismo.
* Lista de usuarios ordenados por números de pedidos mediante esta lista también podrán acceder al detalle de cada usuario  y editar datos del mismo..
* Agregar producto: en la cual podrán agregar un nuevo producto con los datos mencionados arriba.
* Editar y eliminar productos desde la lista de todos los productos.

### Lista de requerimientos:

##### API

	1. Crear, listar, editar y eliminar producto.
	2. Crear SingIn y SingUp de usuarios para crear la autentificacion de roles y proteccion de cuentas.
	3. Crear, editar y eliminar usuarios.
	4. Crear, editar y eliminar ordenes

