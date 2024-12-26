import { useEffect, useRef } from "react";
import { useConversation } from "../hooks/userStore";
import Message from "./Message";
import toast from "react-hot-toast";
import useListenMessages from "../hooks/useListenMessages";

const MessagesContainer = () => {
  const {
    messages,
    selectedConversation,
    setMessages,
    setSelectedConversation,
  } = useConversation();
  const lastMessageRef = useRef();
  useListenMessages();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_GET_MESSAGES_URL}/${
            selectedConversation.userId
          }`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log(data);
        await setMessages(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    if (selectedConversation?.userId) {
      getMessages();
    }
  }, [selectedConversation?.userId, setMessages]);

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="flex flex-col overflow-auto p-4 flex-grow max-w-screen-sm">
      {!selectedConversation && (
        <div className="flex items-center justify-center h-full text-gray-400">
          Select a conversation
        </div>
      )}
      {selectedConversation && messages.length === 0 && "Send a message"}

      {selectedConversation &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default MessagesContainer;
