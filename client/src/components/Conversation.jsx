import { useConversation } from "../hooks/userStore";
import { useSocketContext } from "../hooks/useSocketContext.js";

/* eslint-disable react/prop-types */
const Conversation = ({conversation}) => {
    const {setSelectedConversation} = useConversation()
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation.userId);

  return (
    <div className="m-2 group" onClick={() => setSelectedConversation(conversation)}>
      <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-400 transition-all duration-500 p-2 py-1 rounded '>
        <div className={ `avatar ${isOnline ? "online" : "offline"}`}>
            <div className="w-12 rounded-full">
                <img src={conversation.profilePic} />
            </div>
        </div>
        <div className="group-hover:text-gray-700 transition-all duration-500">{conversation.name} {conversation.surname}</div>
      </div>  
      <div className="divider my-0"></div>
    </div>
  );
};

export default Conversation;
