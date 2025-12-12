import express from "express";
import {
  getUserProfile,
  getUserJobs,
  searchUsers
} from "../controllers/userController.js";

const router = express.Router();

// ✅ MUST be first
router.get("/", searchUsers);

router.get("/:userId", getUserProfile);
router.get("/:userId/jobs", getUserJobs);

export default router;
