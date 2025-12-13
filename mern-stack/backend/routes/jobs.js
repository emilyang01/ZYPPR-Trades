// routes/jobs.js
import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { searchJobs } from "../services/searchService.js";
import Job from "../models/job.js";

const router = express.Router();

// ✅ public search
router.get("/", async (req, res) => {
  try {
    const jobs = await searchJobs(req.query);
    res.json(jobs);
  } catch (err) {
    console.error("Job search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ NEW: get one job by id (public)
router.get("/:jobId", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate("posted_by", "first_name last_name email city")
      .lean();

    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error("Get job error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// create job (requires auth)
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
