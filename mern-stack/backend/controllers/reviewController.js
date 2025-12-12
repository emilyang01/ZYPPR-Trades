// backend/controllers/reviewController.js
import Review from "../models/Review.js";

// GET /api/reviews  – list latest reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(20);
    res.json(reviews);
  } catch (err) {
    console.error("Error in getReviews:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/reviews  – create a new review (optional, for later use)
export const createReview = async (req, res) => {
  try {
    const { rating, title, text, name, date } = req.body;

    if (!rating || !title || !name || !date) {
      return res.status(400).json({ error: "rating, title, name, and date are required" });
    }

    const review = await Review.create({ rating, title, text, name, date });
    res.status(201).json(review);
  } catch (err) {
    console.error("Error in createReview:", err);
    res.status(500).json({ error: "Server error" });
  }
};