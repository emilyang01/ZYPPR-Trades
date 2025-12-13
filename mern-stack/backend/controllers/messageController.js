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
    const { userId } = req.params;
    const currentUserId = req.user.id; // Get from auth middleware (requireAuth sets req.user.id)

    // Get all messages between the two users (both directions)
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId }
      ]
    }).sort({ createdAt: 1 }); // Sort by oldest first

    res.json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ error: error.message });
  }
};