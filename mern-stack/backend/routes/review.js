// backend/routes/review.js
import express from "express";
import { getReviews, createReview } from "../controllers/reviewController.js";

const router = express.Router();

// GET /api/reviews
router.get("/", getReviews);

// POST /api/reviews   (optional – use when you add a form)
router.post("/", createReview);

export default router;
