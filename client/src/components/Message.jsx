/* eslint-disable react/prop-types */
import { useConversation, useUserStore } from "../hooks/userStore";

const Message = ({message}) => {
  const {user} = useUserStore();
  const {selectedConversation} = useConversation()
  const fromMe = user.userId === message.from
  
  return (
    <>
      <div className= {`chat ${fromMe ? "chat-end" : "chat-start"} `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={`${fromMe ? user.profilePic : selectedConversation.profilePic}`}
            />
          </div>
        </div>
        <div className="chat-header">
          {}
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">{message.message}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </>
  );
};

export default Message;
