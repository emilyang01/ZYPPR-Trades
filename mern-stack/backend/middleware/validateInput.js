// backend/middleware/validateInput.js
export const validateRegisterInput = (req, res, next) => {
  const { name, first_name, last_name, email, password } = req.body;

  // 1) All fields present? (accept either name OR first_name/last_name)
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (!name && !first_name && !last_name) {
    return res.status(400).json({ message: "Name is required" });
  }

  // 2) Password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  // 3) Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // ✅ All good – move to the actual route handler
  next();
};

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  next();
};
