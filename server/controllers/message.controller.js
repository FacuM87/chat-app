import Conversation from '../db/models/conversation.model.js';
import Message from '../db/models/message.model.js'
export const sendMessage = async (req, res) => {

    try {
        const {receiver_id} = req.params;
        const {message} = req.body;
        const {userId: senderId} = req.user;


        if(!receiver_id || !message) {
            return res.status(400).json({status: "fail", message: "All fields are required"});
        }

        const newMessage = new Message({
            from: senderId,
            to: receiver_id,
            message
        })

        const newMessageId = newMessage._id
      
        let conversation = await Conversation.findOne({members: {$all: [receiver_id, senderId]}})

       
        if(!conversation) {
            conversation = await Conversation.create({members: [receiver_id, senderId]})
        }
        
        conversation.messages.push(newMessageId)
        
        await newMessage.save()
        await conversation.save()

        res.status(200).json({status:"message sent",receiver_id, senderId, message}) 
        
    } catch (error) {
        console.log("Error at sendMessage controller: ", error);
        res.status(500).json({status: "sending message fail", message: "Internal server error while sending message: "+error.message});
    }
    
}

export const getMessages = async (req, res) => {
    try {   
        const {receiver_id} = req.params;
        const {userId: senderId} = req.user;

        if(!receiver_id) {
            return res.status(400).json({status: "fail", message: "All fields are required"});
        }

        const conversation = await Conversation.findOne({members: {$all: [receiver_id, senderId]}}).populate("messages")

        if(!conversation) {
            return res.status(200).json([]);
        }
        
        res.status(200).json({status:"get messages success", messages: conversation.messages})
        
    } catch (error) {
        console.log("Error at getMessages controller: ", error);
        
        res.status(500).json({status: "getting messages fail", message: "Internal server error while getting messages: "+error.message});
    }
}