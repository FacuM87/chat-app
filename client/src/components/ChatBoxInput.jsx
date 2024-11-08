import { TbSend2 } from "react-icons/tb";
import { useConversation } from "../hooks/userStore";
import toast from "react-hot-toast";



const ChatBoxInput = () => {

    const {selectedConversation} = useConversation();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(selectedConversation);
        const message = e.target.messageInput.value;
        
        if (!selectedConversation) {
            toast.error("Please select a conversation");
            return;
        }

        if (!message) {
            toast.error("Cannot send an empty message");
            return;
        }
        
        console.log(message);
        
        const sendMessage = async() =>{
            try {
                const response = await fetch(`${import.meta.env.VITE_SEND_MESSAGES_URL}/${selectedConversation.userId}`, {
                    headers: {"Content-Type": "application/json"},
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({message})
                })
                const data = await response.json()
                console.log({data});
                e.target.reset(); 
            } catch (error) {
                toast.error(error.message);
            }
        }
        sendMessage()

    };

  return (
    <form autoComplete="off" onSubmit={handleOnSubmit}>
      <label className="input input-bordered flex items-center gap-2">
        <input id="messageInput" type="text" className="grow rounded-none rounded-r-lg border-none" placeholder="Write your message" />
        <button type="submit">
          <TbSend2 className="text-2xl cursor-pointer" />
        </button>
      </label>
    </form>
  );
};

export default ChatBoxInput;
