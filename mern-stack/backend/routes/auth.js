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
  const { email, password, first_name, last_name, name, role } = req.body;

  // 🟢 DB READ: check if user exists
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: "Email already in use" });
  }

  // Handle both old 'name' format and new 'first_name/last_name' format
  const userData = {
    email,
    password,
    first_name: first_name || name || 'User',
    last_name: last_name || 'User',
    role: role || 'user' // Accept role from request, default to 'user'
  };

  // 🟢 DB WRITE: create user (pre-save hook hashes password)
  const user = await User.create(userData);

  // Create JWT with id + role
  const token = sign(user);

  // Send token + basic user info (no password)
  res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
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
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
});

export default router;
