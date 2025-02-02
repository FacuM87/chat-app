import ChatRoom from "../db/models/generalChat.model.js";

const initializeGeneralChat = async () => {
    try {
        const generalChat = await ChatRoom.findOne({ name: "generalChat" });
        if (!generalChat) {
            const newGeneralChat = new ChatRoom({ name: "generalChat", isGeneral: true });
            await newGeneralChat.save();
        }
        console.log("✅ Sala de chat general creada");
        
    } catch (error) {
        console.log("Couldn't initialize general chat",error);
        
    }
}

export default initializeGeneralChat;