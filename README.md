# Chat App

Real-time chat application built with **MERN Stack** (MongoDB, Express, React, and Node.js), using WebSocket protocol for real-time communication via Socket.io library.

## Features

- User registration and authentication.
- Sending and receiving real-time messages.
- List of conversations and messages.
- Online user notifications.
- Route protection with JWT-based authentication.
- Sending confirmation emails for registration.

## Applied Tecnologies
- **Frontend**: React, Vite, TailwindCSS, DaisyUI, Zustand, React Router, Socket.io-client
- **Backend**: Node.js, Express, Mongoose, JWT, Bcrypt, Nodemailer, Socket.io
- **Base de Datos**: MongoDB

## Installation

1. Clone the repository:

```sh
git clone https://github.com/FacuM87/chat-app.git
cd chat-app
```

2. Install server and client dependencies:
```sh
npm install
npm install --prefix client
```
3. Set up the environment variables.

4. Start the application locally by running the following command in your terminal:
```sh
npm run server
```

## Scripts
- ```npm run server```: Starts the server in development mode.
- ```npm run build```: Prepares the application for production.
- ```npm run start```: Starts the server in production mode.

