// backend/routes/message.js
import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

// POST /api/messages/send
router.post("/send", sendMessage);

// GET /api/messages/:userId
router.get("/:userId", getMessages);

export default router;