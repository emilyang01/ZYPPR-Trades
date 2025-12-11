// backend/controllers/userController.js
import User from "../models/User.js";
import Job from "../models/job.js";

// GET /api/users/:userId  -> basic public profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error in getUserProfile:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users/:userId/jobs  -> jobs posted by this user
export const getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ posted_by: req.params.userId });
    res.json(jobs);
  } catch (err) {
    console.error("Error in getUserJobs:", err);
    res.status(500).json({ error: err.message });
  }
};
