
const Message = require('../models/Message');
const Notification = require('../models/Notification');

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const message = await Message.create({ senderId, receiverId, content });

    // Trigger notification for receiver
    await Notification.create({
      userId: receiverId,
      type: 'message',
      message: `New message from ${senderId}`
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ receiverId: req.params.userId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
