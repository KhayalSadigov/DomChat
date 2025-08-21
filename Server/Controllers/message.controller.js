const Message = require("../Models/message.model");

const messageController = {
  // Get all messages
    getAll: async (req, res) => {
        try {
            const messages = await Message.findAll();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: "Error fetching messages", error });
        }
    },
    // Get a single message by ID
    getOne: async (req, res) => {
        try {
            const message = await Message.findByPk(req.params.id);
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ message: "Message not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error fetching message", error });
        }
    },
    delete: async (req, res) => {
        try {
            const message = await Message.findByPk(req.params.id);
            if (message) {
                await message.destroy();
                res.status(200).json({ message: "Message deleted successfully" });
            } else {
                res.status(404).json({ message: "Message not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting message", error });
        }
    },
    // Send a new message
    send: async (req, res) => {
        try {
            const { content, sender, receiver } = req.body;
            if (!content || !sender || !receiver) {
                return res.status(400).json({ message: "Content, sender, and receiver are required" });
            }
            const newMessage = await Message.create(req.body);
            res.status(201).json(newMessage);
        } catch (error) {
            res.status(500).json({ message: "Error sending message", error });
        }
    },
}

module.exports = messageController;