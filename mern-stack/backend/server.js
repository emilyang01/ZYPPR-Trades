import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// ✅ Load .env from the mern-stack root folder
dotenv.config({ path: ".env", override: true });

// Debug line (helps confirm env file is loaded)
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Import backend routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import meRoutes from "./routes/me.js";

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", meRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
try {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`✅ MongoDB connected`);
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ DB connect error:", err.message);
  process.exit(1);
}
