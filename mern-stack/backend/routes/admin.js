import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// All /api/admin/* routes require auth + admin role
router.use(requireAuth, requireRole("admin"));

// GET /api/admin/stats
router.get("/stats", async (_req, res) => {
  res.json({ ok: true, scope: "admin" });
});

export default router;
