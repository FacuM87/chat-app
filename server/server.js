import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/messages.routes.js'
import usersRoutes from './routes/users.routes.js'
import { connectToMongoDB } from './db/connectToMongo.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get("/", (req, res) => {
    console.log("Hello World!");
    
    res.send("Hello World!")
})

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", usersRoutes)

app.listen(process.env.PORT, () => {
    connectToMongoDB()
    console.log(`Server listening on port ${process.env.PORT}`)
})

