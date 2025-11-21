import jwt from "jsonwebtoken";

// Verify JWT, attach req.user = { id, role }
export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const p = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: p.sub, role: p.role };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Ensure user has one of the allowed roles
export const requireRole = (...allowed) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthenticated" });
  if (!allowed.includes(req.user.role))
    return res.status(403).json({ message: "Forbidden" });
  next();
};
