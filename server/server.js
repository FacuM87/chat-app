import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/messages.routes.js'
import usersRoutes from './routes/users.routes.js'
import { connectToMongoDB } from './db/connectToMongo.js'
import {app, server } from './socket/socket.js'

import cors from 'cors' // SOLO PARA DESARROLLO

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})) // SOLO PARA DESARROLLO

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", usersRoutes)

server.listen(process.env.PORT, () => {
    connectToMongoDB()
    console.log(`Server listening on port ${process.env.PORT}`)
})

