import { useConversation } from "../hooks/userStore";

/* eslint-disable react/prop-types */
const Conversation = ({conversation}) => {
    const {setSelectedConversation} = useConversation()
  return (
    <div className="m-2" onClick={() => setSelectedConversation(conversation)}>
      <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-400 transition-all duration-500 p-2 py-1 rounded '>
        <div className="avatar online">
            <div className="w-12 rounded-full">
            <img src={conversation.profilePic} />
            </div>
        </div>
        <div>{conversation.name} {conversation.surname}</div>
      </div>  
      <div className="divider my-0"></div>
    </div>
  );
};

export default Conversation;
