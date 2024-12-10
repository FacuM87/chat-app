/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUserStore } from "./hooks/userStore";


export const socketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const authUser = useUserStore((state) => state.user);
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (authUser) {
            const serverURL = window.location.hostname === 'localhost'? "http://localhost:8000" : "https://facu-chat-app.onrender.com"

            const socket = io(serverURL, {
                withCredentials: true,
                query: { userId: authUser.userId },
            })
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)})
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); 

    return  <socketContext.Provider value={{socket, onlineUsers}}>
                {children}
            </socketContext.Provider>;
};

