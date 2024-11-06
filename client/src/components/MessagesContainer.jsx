import { useConversation } from "../hooks/userStore"
import Message from "./Message"


const MessagesContainer = () => {
    const {selectedConversation} = useConversation()

    return (
    <div className="flex flex-col overflow-auto p-4 flex-grow">
        {!selectedConversation? "Select a conversation" : <Message/>}
        
             
    </div>
  )
}

export default MessagesContainer
