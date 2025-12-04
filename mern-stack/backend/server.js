import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Import routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import meRoutes from "./routes/me.js";
import paymentRoutes from "./routes/payments.js"; // ✔ lowercase filename

dotenv.config({ path: ".env", override: true });

console.log(
  "Loaded MONGO_URI:",
  process.env.MONGO_URI ? "✅ Found" : "❌ Missing"
);

const app = express();
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", meRoutes);
app.use("/api/payments", paymentRoutes); // ✔ lowercase endpoint

const PORT = process.env.PORT || 5000;

try {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log("✅ MongoDB connected");
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ DB connect error:", err.message);
  process.exit(1);
}
