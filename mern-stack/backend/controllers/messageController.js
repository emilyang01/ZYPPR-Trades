import Message from "../models/Message.js";
import Notification from "../models/Notification.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    const message = await Message.create({ senderId, receiverId, content });

    // Create notification using your schema fields
    await Notification.create({
      user: receiverId,            // matches schema
      fromUser: senderId,          // matches schema
      type: "message",
      message: `New message from ${senderId}`,
      messageRef: message._id,     // optional but useful
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      receiverId: req.params.userId,
    });

    res.json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ error: error.message });
  }
};