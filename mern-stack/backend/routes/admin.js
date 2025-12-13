// routes/admin.js
import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { adminSearchUsers } from "../services/searchService.js";

const router = express.Router();

// All admin routes require auth + admin role
router.use(requireAuth, requireRole("admin"));

/**
 * Simple test route:
 * GET /api/admin/stats
 */
router.get("/stats", (_req, res) => {
  res.json({ ok: true, scope: "admin" });
});

/**
 * Admin user search:
 * GET /api/admin/search/users
 *
 * Example:
 *   /api/admin/search/users?q=ansar&role=user&page=1&limit=20
 */
router.get("/search/users", async (req, res) => {
  try {
    const {
      q = "",
      email = "",
      role = "",
      isVerified = "",
      minRating = "",
      location = "",
      page = "1",
      limit = "20",
    } = req.query;

    const filters = {
      q,
      email,
      role,
      isVerified: isVerified === "" ? "" : isVerified === "true",
      minRating: minRating ? Number(minRating) : "",
      location,
      page: Number(page) || 1,
      limit: Number(limit) || 20,
    };

    const result = await adminSearchUsers(filters);
    res.json(result);
  } catch (err) {
    console.error("Admin search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Delete duplicate users by name:
 * DELETE /api/admin/cleanup/duplicates
 * Body: { first_name: "Shamrit", last_name: "Phagura" }
 */
router.delete("/cleanup/duplicates", async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    
    if (!first_name || !last_name) {
      return res.status(400).json({ message: "first_name and last_name are required" });
    }

    const User = (await import("../models/User.js")).default;
    
    // Find all users with this name
    const users = await User.find({ first_name, last_name });
    
    if (users.length === 0) {
      return res.json({ message: "No users found with that name", deleted: 0 });
    }
    
    // Delete all of them
    const result = await User.deleteMany({ first_name, last_name });
    
    res.json({ 
      message: `Deleted ${result.deletedCount} user(s) named ${first_name} ${last_name}`,
      deleted: result.deletedCount 
    });
  } catch (err) {
    console.error("Cleanup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
