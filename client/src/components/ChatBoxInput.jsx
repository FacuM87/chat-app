import { TbSend2 } from "react-icons/tb";

const ChatBoxInput = () => {
  return (
    <form autoComplete="off">
      <label className="input input-bordered flex items-center gap-2">
        <input
          id="messageInput"
          type="text"
          className="grow rounded-none rounded-r-lg border-none"
          placeholder="Write your message"
        />
        <button type="submit">
          <TbSend2 className="text-2xl cursor-pointer" />
        </button>
      </label>
    </form>
  );
};

export default ChatBoxInput;
