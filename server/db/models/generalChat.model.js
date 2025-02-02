import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isGeneral: { type: Boolean, default: false }, 
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});
  
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
  
export default ChatRoom;