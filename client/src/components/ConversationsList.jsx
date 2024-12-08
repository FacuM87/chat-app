import useConversations from "../hooks/useConversations";
import { useUserStore } from "../hooks/userStore";
import Conversation from "./Conversation";
const ConversationsList = () => {
    const {conversations} = useConversations()
    const {user} = useUserStore(); 


  return (
    <div className="overflow-auto max-h-[400px]">
      {conversations.map((conversation) => ( 
        conversation.userId !== user.userId && <Conversation key={conversation.userId} conversation={conversation} />
      ))}
    </div>
  );
};

export default ConversationsList;
