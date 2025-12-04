// backend/routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validateInput.js";

const router = express.Router();
const EXPIRES = "7d";

const sign = (u) =>
  jwt.sign({ sub: u._id, role: u.role }, process.env.JWT_SECRET, {
    expiresIn: EXPIRES,
  });

// POST /api/auth/register  --------------------------
router.post("/register", validateRegisterInput, async (req, res) => {
  const { email, password, name } = req.body;

  // 🟢 DB READ: check if user exists
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: "Email already in use" });
  }

  // 🟢 DB WRITE: create user (pre-save hook hashes password)
  const user = await User.create({ email, password, name });

  // Create JWT with id + role
  const token = sign(user);

  // Send token + basic user info (no password)
  res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  });
});

// POST /api/auth/login  -----------------------------
router.post("/login", validateLoginInput, async (req, res) => {
  const { email, password } = req.body;

  // 🟢 DB READ: get user + password hash
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check password using method from User.js
  const ok = await user.matchPassword(password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create JWT
  const token = sign(user);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  });
});

export default router;
