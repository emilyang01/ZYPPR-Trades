// backend/routes/search.js
import express from "express";
import { searchUsers, searchJobs } from "../services/searchService.js";

const router = express.Router();

/**
 * Public user search:
 * GET /api/search/users
 */
router.get("/users", async (req, res) => {
  try {
    const {
      q = "",
      location = "",
      minRate = "",
      maxRate = "",
      categories = "",
      page = "1",
      limit = "12",
    } = req.query;

    const filters = {
      q,
      location,
      minRate: minRate ? Number(minRate) : "",
      maxRate: maxRate ? Number(maxRate) : "",
      categories: categories ? categories.split(",") : [],
      page: Number(page) || 1,
      limit: Number(limit) || 12,
    };

    const result = await searchUsers(filters);
    res.json(result);
  } catch (err) {
    console.error("User search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Public job search:
 * GET /api/search/jobs
 */
router.get("/jobs", async (req, res) => {
  try {
    const {
      q = "",
      location = "",
      minRate = "",
      maxRate = "",
      categories = "",
      page = "1",
      limit = "12",
    } = req.query;

    const filters = {
      q,
      location,
      minRate: minRate ? Number(minRate) : "",
      maxRate: maxRate ? Number(maxRate) : "",
      categories: categories ? categories.split(",") : [],
      page: Number(page) || 1,
      limit: Number(limit) || 12,
    };

    const result = await searchJobs(filters);
    res.json(result);
  } catch (err) {
    console.error("Job search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
