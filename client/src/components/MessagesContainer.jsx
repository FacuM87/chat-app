import { useEffect } from "react"
import { useConversation } from "../hooks/userStore"
import Message from "./Message"
import toast from "react-hot-toast"


const MessagesContainer = () => {
    const {messages, selectedConversation, setMessages, setSelectedConversation} = useConversation()  
    
    useEffect(() => {
        const getMessages = async() =>{
            try {
              const response = await fetch(`${import.meta.env.VITE_GET_MESSAGES_URL}/${selectedConversation.userId}`,{
                method: "GET",
                credentials: "include"
              })

              const data = await response.json()
              console.log(data);
              await setMessages(data)
              
            } catch (error) {
              console.log(error);
              toast.error(error.message); 
            } 
        }

        if (selectedConversation?.userId) {getMessages()}    
     },[selectedConversation?.userId, setMessages])
    
    useEffect(() => {
        return () => setSelectedConversation(null)
     },[setSelectedConversation])

    useEffect(() => {
      console.log({messages});
    },[messages]) 

    return (
    <div className="flex flex-col overflow-auto p-4 flex-grow">
        {!selectedConversation && "Select a conversation"}
        {selectedConversation && messages.length === 0 && "Send a message"}

        {selectedConversation && messages.length > 0 && messages.map((message) => (<Message key={message._id} message={message} />))}
                    
    </div>
  )
}

export default MessagesContainer
