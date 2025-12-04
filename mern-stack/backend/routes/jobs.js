// routes/jobs.js
import express from "express";
import { requireAuth } from "../middleware/auth.js"; // only used for create
import { searchJobs } from "../services/searchService.js";
import Job from "../models/job.js";

const router = express.Router();

/**
 * GET /api/jobs
 * Public job search with filters
 *
 * Query examples:
 *   /api/jobs?q=plumber&city=Sacramento&minRate=20&maxRate=60
 *   /api/jobs?category=plumbing
 */
router.get("/", async (req, res) => {
  try {
    const jobs = await searchJobs(req.query);
    res.json(jobs);
  } catch (err) {
    console.error("Job search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/jobs
 * Create job (requires auth)
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      posted_by: req.user.id,
    });
    res.status(201).json(job);
  } catch (err) {
    console.error("Job create error:", err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
