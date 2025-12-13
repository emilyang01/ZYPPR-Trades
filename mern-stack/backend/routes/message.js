// backend/routes/message.js
import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// POST /api/messages/send
router.post("/send", requireAuth, sendMessage);

// GET /api/messages/:userId
router.get("/:userId", requireAuth, getMessages);

export default router;