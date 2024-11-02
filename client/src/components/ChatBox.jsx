import ChatBoxHeader from "./ChatBoxHeader";
import MessagesContainer from "./MessagesContainer";
import ChatBoxInput from "./ChatBoxInput";

const ChatBox = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col border-l border-gray-300">
      <ChatBoxHeader />
      <MessagesContainer />
      <ChatBoxInput />
    </div>
    
  );
};

export default ChatBox;
