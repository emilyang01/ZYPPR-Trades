// backend/controllers/jobController.js
import Job from "../models/job.js";

export const getJobs = async (req, res) => {
  try {
    const { q, category, minRate, maxRate } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { category: new RegExp(q, "i") },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (minRate || maxRate) {
      filter.hourly_rate = {};
      if (minRate) filter.hourly_rate.$gte = Number(minRate);
      if (maxRate) filter.hourly_rate.$lte = Number(maxRate);
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    console.error("Error in getJobs:", err);
    res.status(500).json({ error: "Server error" });
  }
};
