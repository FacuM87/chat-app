
import { useEffect } from "react"
import { useConversation } from "./userStore.js"
import { useSocketContext } from "./useSocketContext.js"

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (message) => {setMessages([...messages, message])})

        return () => {socket?.off("newMessage")};
    }, [socket, messages, setMessages])    
}

export default useListenMessages