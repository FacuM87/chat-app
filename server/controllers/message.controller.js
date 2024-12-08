import Conversation from '../db/models/conversation.model.js';
import Message from '../db/models/message.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js';
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

        const messageId = newMessage._id
      
        let conversation = await Conversation.findOne({members: {$all: [receiver_id, senderId]}})

       
        if(!conversation) {
            conversation = await Conversation.create({members: [receiver_id, senderId]})
        }
        
        conversation.messages.push(messageId)
        
        await newMessage.save()
        await conversation.save()

        // Socket.io functionality
        const receiverSocketId = getReceiverSocketId(receiver_id)
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(newMessage) 
        
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
        
        res.status(200).json(conversation.messages)
        
    } catch (error) {
        console.log("Error at getMessages controller: ", error);
        
        res.status(500).json({status: "getting messages fail", message: "Internal server error while getting messages: "+error.message});
    }
}