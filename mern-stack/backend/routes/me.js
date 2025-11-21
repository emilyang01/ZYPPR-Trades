import express from "express";
import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// All routes here require authentication
router.use(requireAuth);

// GET /api/me
router.get("/me", async (req, res) => {
  const me = await User.findById(req.user.id).lean();
  if (!me) return res.status(404).json({ message: "Not found" });

  res.json({
    id: me._id,
    email: me.email,
    role: me.role,
    name: me.name,
  });
});

// PATCH /api/me
router.patch("/me", async (req, res) => {
  const { name } = req.body;

  const me = await User.findByIdAndUpdate(
    req.user.id,
    { name },
    { new: true }
  ).lean();

  res.json({
    id: me._id,
    email: me.email,
    role: me.role,
    name: me.name,
  });
});

export default router;
