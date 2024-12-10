import express from "express";
import { Server } from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import { verifyToken } from "../utils/jwt.js";

const app = express()
app.use(cookieParser())

const server = http.createServer(app);
//const deploy = process.env.NODE_ENV === "development" ? "http://localhost:5173": process.env.PROD_ORIGIN
const io = new Server(server, {
    cors: {
        origin: process.env.PROD_ORIGIN,
        credentials: true,
    },
});

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId]

const userSocketMap = {}

io.use((socket, next) => {
    try {
        const cookies = socket.request.headers.cookie;
        if (!cookies) {
            return next(new Error("No cookies found"));
        }

        const parsedCookies = cookie.parse(cookies);
        const jwtCookie = parsedCookies.jwtCookie; 

        if (!jwtCookie) {
            return next(new Error("No token provided"));
        }

        const decodedToken = verifyToken(jwtCookie);
        if (!decodedToken) {
            return next(new Error("Invalid or expired token"));
        }

        socket.user = decodedToken.user;
        next();    
    } catch (error) {
        console.log("Socket authentication error:", error.message);
        return next(new Error("Authentication failed"));
    }
});


io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId
    if (userId != "undefined") userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
});

export {app, io, server}