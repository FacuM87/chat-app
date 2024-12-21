# Chat App

Aplicación de chat en tiempo real construida con MERN Stack (Mongo DB, Express, React y Node JS). A la vez que se implementa el protocolo WebSockets para la comunicación en tiempo real a través de la librería Socket.io.

## Instalación

1. Clona el repositorio:

```sh
git clone https://github.com/tu-usuario/chatapp.git
cd chatapp
```

2. Instala las dependencias del servidor y el cliente:
```sh
npm install
npm install --prefix client
```
3. Configura las variables de entorno.

4. Inicia la aplicación localmente ejecutando el siguiente comando en consola:
```sh
npm run server
```

## Scripts Disponibles
- ```npm run server```: Inicia el servidor en modo de desarrollo.
- ```npm run build```: Prepara la aplicación para producción.
- ```npm run start```: Inicia el servidor en modo producción.


## Tecnologías Aplicadas
- **Frontend**: React, Vite, TailwindCSS, DaisyUI, Zustand, React Router, Socket.io-client
- **Backend**: Node.js, Express, Mongoose, JWT, Bcrypt, Nodemailer, Socket.io
- **Base de Datos**: MongoDB
