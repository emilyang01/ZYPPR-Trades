import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const EXPIRES = "7d";
const sign = (u) =>
  jwt.sign({ sub: u._id, role: u.role }, process.env.JWT_SECRET, {
    expiresIn: EXPIRES,
  });

// POST /api/auth/register  --------------------------
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  // 🟢 DB READ: check if user exists
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  // 🟢 DB WRITE: create user (triggers password hashing in User.js)
  const user = await User.create({ email, password, name });

  // create JWT with id + role
  const token = sign(user);

  // send token + basic user info (no password)
  res.status(201).json({
    token,
    user: { id: user.id, email: user.email, role: user.role, name: user.name },
  });
});

// POST /api/auth/login  -----------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 🟢 DB READ: get user + password hash
  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // check password using method from User.js
  const ok = await user.matchPassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  // create JWT
  const token = sign(user);

  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role, name: user.name },
  });
});

export default router;
