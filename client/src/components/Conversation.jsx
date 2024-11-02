const Conversation = () => {
  return (
    <div className="m-2">
      <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-400 transition-all duration-500 p-2 py-1 rounded">
        <div className="avatar online">
            <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <div>Pepe</div>
      </div>  
      <div className="divider my-0"></div>
    </div>
  );
};

export default Conversation;
