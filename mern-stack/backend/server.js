import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import jobRoutes from "./routes/job.js";

// Import backend routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import meRoutes from "./routes/me.js";
import messageRoutes from "./routes/message.js";
import notificationRoutes from "./routes/notification.js";

// Load env vars from .env in the mern-stack root
dotenv.config({ path: ".env", override: true });

// Debug: confirm MONGO_URI is loaded
console.log(
  "Loaded MONGO_URI:",
  process.env.MONGO_URI ? "✅ Found" : "❌ Missing"
);

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", meRoutes); // e.g. /api/me
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/jobs", jobRoutes);


// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
try {
  await connectDB(); // connectDB reads process.env.MONGO_URI internally
  app.listen(PORT, () => {
    console.log("✅ MongoDB connected");
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ DB connect error:", err.message);
  process.exit(1);
}
