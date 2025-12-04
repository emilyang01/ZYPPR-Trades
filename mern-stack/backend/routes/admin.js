// backend/routes/admin.js
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
 * Example query:
 *   /api/admin/search/users?q=ansar&role=user&page=1&limit=20
 *
 * NOTE FOR DB PERSON:
 *   This just forwards filters to adminSearchUsers in searchService.js
 *   That function should be implemented with real MongoDB queries later.
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

export default router;
