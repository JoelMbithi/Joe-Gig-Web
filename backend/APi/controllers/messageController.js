import Message from "../Models/messageModel.js";
import Conversation from "../Models/conversationModel.js";

// Create a message
export const createMessage = async (req, res) => {
    try {
        const newMessage = new Message({
            conversationId: req.body.conversationId,
            userId: req.body.userId,
            description: req.body.description
        });

        const savedMessage = await newMessage.save();

        await Conversation.findOneAndUpdate(
            { conversationId: req.body.conversationId }, // ✅ Fixed field name
            {
                $set: {
                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller,
                    lastMessage: req.body.description,
                }
            },
            { new: true }
        );

        res.status(200).json(savedMessage);
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get messages
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.id }); // ✅ Fixed typo
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: error.message });
    }
};
