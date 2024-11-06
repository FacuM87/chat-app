import useConversations from "../hooks/useConversations";
import Conversation from "./Conversation";
const ConversationsList = () => {
    const {conversations} = useConversations() 


  return (
    <div className="overflow-auto max-h-[400px]">
      {conversations.map((conversation) => (        
        <Conversation key={conversation.userId} conversation={conversation} />
      ))}
    </div>
  );
};

export default ConversationsList;
