# Hagamos una API

Hola! si llegaste hasta aquí es por que viste la playlist de mi canal de YouTube llamada [Hagamos una API](https://www.youtube.com/playlist?list=PLFa-_vpcTxV8NZjlVdvBWsTXMC7xs0nnc) donde voy desarrollando esta API en cada video.

Bienvenido :smile: esto proyecto es una API para un sistema de pedidos de una pastelería desarrollada en Node.js junto a TypeScript y distintos módulos de Node.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

_Que cosas necesitas para instalar para que la API funcione:_

```
Nodejs
MongoDB
(opcional) Postman
```

### Ejecución🔧

_Para poder ejecutar la API y realizar peticiones necesitar seguir los siguientes pasos_

1. Debes crear una Base de datos en mongoDB con el nombre de tu Bakery Store y obtener su url de conexión.
2. Con la URL de conexión dirígete a  la ruta ./src/config/config.ts y reemplaza la variable __LOCAL_DB__ con la url de tu base de datos.
3. En la misma ruta cambia la variable __JWTSECRET__ que setea la firma con la que se generaran tokens de usuarios.
4. Abre una terminal desde la raíz del repositorio y ejecuta el siguiente comando para instalar todas las dependencias de Node que necesita la API para funcionar.

```
npm i
```

5. Una vez terminado todo el proceso de instalación ejecuta el siguiente comando para transpilar el código de Typescript.

```
npm run build
```

6. Finalmente ejecuta el siguiente comando para levantar el servidor con Expressjs / este comando transpilara de manera automática cualquier modificación que realices a algún archivo de TypeScript.

```
npm run dev
```

7. __En un entorno de producción__ se debe ejecutar el siguiente comando para levantar el servidor.

```
npm run start
```

## Ejecutando las pruebas ⚙️

En el siguiente enlace podrás encontrar una documentación lo bastante clara para realizar peticiones a la API desde Postman:

:file_cabinet:  [Documentacion Aqui](https://documenter.getpostman.com/view/9698405/Szt5gBHx?version=latest)

Si tienes dificultades para entender como realizar las peticiones también puedes revisar los videos de la PlayList de YouTube donde desarrollo la API poco a poco, al final de cada video realizo la correspondiente petición.

:video_camera:  [PlayList de Youtube](https://www.youtube.com/playlist?list=PLFa-_vpcTxV8NZjlVdvBWsTXMC7xs0nnc)



## Despliegue 📦

Esta API esta construida con propósitos educativos por lo que ___no seria buena idea utilizarla en producción___ ya que aun requiere muchos detalles para funcionar a gran escala pero si quieres probar como funcionaria en un entorno de ejecución mas avanzado que tu equipo local, te sugiero que utilices Heroku, a continuación te dejo un enlace para ver como lograr deployar la API en este servicio:

[Guia para deployar la API en Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Nodejs](https://nodejs.org/es/) - Plataforma de ejecución.
* [Express js](https://expressjs.com/es/) - El framework de servidor.
* [Mongo DB](https://www.mongodb.com/es) - Base de datos no relacional.
* [Typescript](https://www.typescriptlang.org/) - El lenguaje de programación.
* [Postman](https://www.postman.com/) - Software para realizar peticiones.

## Contribuye 🖇️

Si quieres contribuir con el desarrollo y mejora de esta API, solo sigue estos pasos.

1. cuando realices un Pull request recuerda que cambios estas realizando y por que.
2. Comenta bien las líneas de código que modifiques.
3. Utiliza el tipado fuerte de Typescript.
4. Utiliza principios de código limpio.
5. Ten en cuenta que esta API tiene propósitos de aprendizaje así que realiza cambio simples para no confundir a los que recién comienzan con el desarrollo Back End.

## Autores ✒️

Hasta ahora solo yo, pero estoy esperando mas colaboradores:

* **Oliver Zulett** - *Desarrollo* - [OliverZulett](https://github.com/OliverZulett)

## Licencia 📄

Este proyecto está bajo la Licencia (MIT) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
