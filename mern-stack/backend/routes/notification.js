
import express from "express";
import {
  createNotification,
  getNotifications,
  markNotificationRead
} from "../controllers/notificationController.js";

const router = express.Router();

// Create a notification
router.post("/", createNotification);

// Get notifications for a user
router.get("/:userId", getNotifications);

// Mark a notification as read
router.patch("/:id/read", markNotificationRead);

export default router;
