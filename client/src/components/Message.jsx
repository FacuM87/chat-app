/* eslint-disable react/prop-types */
import { useConversation, useUserStore } from "../hooks/userStore";
import { formatDate } from "../utils.js";

const Message = ({message}) => {
  const {user} = useUserStore();
  const {selectedConversation} = useConversation()
  const fromMe = user.userId === message.from

  return (
    <>
      <div className= {`chat ${fromMe ? "chat-end" : "chat-start"} max-w-full`}>
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
          <time className="text-xs opacity-50">{formatDate(message.createdAt)}</time>
        </div>
        <div className="chat-bubble max-w-[90%] break-words">{message.message}</div>

      </div>
    </>
  );
};

export default Message;
