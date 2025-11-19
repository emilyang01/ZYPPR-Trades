import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth, requireRole("admin"));

router.get("/stats", async (_req, res) => {
  res.json({ ok: true, scope: "admin" });
});

export default router;
