const ChatBoxHeader = () => {
  return (
    <div>
      <div className="flex items-center gap-2 m-4 ">
        <div className="avatar online">
          <div className="w-8 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>Pepe</div>
      </div>
      <div className="divider p-2 m-0"></div>
    </div>

  );
};

export default ChatBoxHeader;
