import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 🔑 THIS IS THE IMPORTANT PART
  const token = jwt.sign(
    {
      sub: user._id.toString(),   // 👈 required for requireAuth
      role: user.role             // 👈 required for requireRole
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      _id: user._id,
      name: `${user.first_name} ${user.last_name}`.trim(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,            // 👈 frontend needs this too
    },
  });
};
