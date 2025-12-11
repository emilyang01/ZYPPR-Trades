// backend/routes/users.js
import express from "express";
import { getUserProfile, getUserJobs } from "../controllers/userController.js";

const router = express.Router();

// Public profile
router.get("/:userId", getUserProfile);

// Jobs belonging to this user
router.get("/:userId/jobs", getUserJobs);

export default router;
