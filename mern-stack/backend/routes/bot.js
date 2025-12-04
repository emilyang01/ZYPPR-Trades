// backend/routes/bot.js
import express from "express";

const router = express.Router();

/**
 * Very simple scripted bot.
 * POST /api/bot/message
 * { "message": "hi" }
 */
router.post("/message", (req, res) => {
  const userMessage = (req.body.message || "").toLowerCase().trim();

  let reply = "Sorry, I didn’t understand that. 😅";

  if (!userMessage) {
  reply = "Say something and I’ll try to help! 🙂";

  // -------------------------------
  // 👋 GREETINGS / ABOUT ZYPPR-TRADES
  // -------------------------------
} else if (
  userMessage.includes("hello") ||
  userMessage.includes("hi") ||
  userMessage.includes("hey") ||
  userMessage.includes("yo") ||
  userMessage.includes("sup")
) {
  reply = "Hey! 👋 I’m ZYPPR Bot, your assistant for ZYPPR-Trades. Are you looking for work, or trying to hire someone?";

} else if (
  userMessage.includes("what is zyppr") ||
  userMessage.includes("zyppr trades") ||
  userMessage.includes("zyppr-trades") ||
  userMessage.includes("what do you do") ||
  userMessage.includes("about this website")
) {
  reply =
    "ZYPPR-Trades is a centralized marketplace for manual and blue-collar work. People can post job requests (like plumbing or moving) and workers can list their skills so both sides find each other faster.";

  // -------------------------------
  // 👤 ACCOUNT / LOGIN / SIGNUP
  // -------------------------------
} else if (
  userMessage.includes("login") ||
  userMessage.includes("log in") ||
  userMessage.includes("sign in")
) {
  reply =
    "To log in, use the Login page with your email and password. Once logged in you’ll be able to view jobs, worker listings, and your dashboard.";

} else if (
  userMessage.includes("signup") ||
  userMessage.includes("sign up") ||
  userMessage.includes("register") ||
  userMessage.includes("create account")
) {
  reply =
    "To create an account, go to the Signup page and enter your basic info. You can then either post job requests or create a worker listing.";

} else if (
  userMessage.includes("forgot password") ||
  userMessage.includes("reset password")
) {
  reply =
    "Password reset isn’t fully implemented yet. For now, you may need to contact the site owner or create a new account.";

  // -------------------------------
  // 🛠️ JOB REQUESTS (HIRING SOMEONE)
  // -------------------------------
} else if (
  userMessage.includes("post a job") ||
  userMessage.includes("post job") ||
  userMessage.includes("job request") ||
  userMessage.includes("hire someone") ||
  userMessage.includes("hire worker") ||
  userMessage.includes("create job")
) {
  reply =
    "To post a job request:\n1️⃣ Log in to your account\n2️⃣ Go to the 'Post Job' or Jobs section\n3️⃣ Add a title, description, location/city, category, and hourly rate or budget\n4️⃣ Submit it\nWorkers will be able to find and apply to your job from their side.";

} else if (
  userMessage.includes("edit job") ||
  userMessage.includes("update job") ||
  userMessage.includes("delete job")
) {
  reply =
    "You’ll be able to manage your posted jobs from your dashboard: edit details, mark as filled, or remove them once the work is complete.";

  // -------------------------------
  // 👷 WORKER LISTINGS (FINDING WORK)
  // -------------------------------
} else if (
  userMessage.includes("worker listing") ||
  userMessage.includes("create listing") ||
  userMessage.includes("post my skills") ||
  userMessage.includes("find work") ||
  userMessage.includes("get hired") ||
  userMessage.includes("looking for work")
) {
  reply =
    "If you’re a worker, you can create a listing that shows your skills (like plumbing, cleaning, moving), your city, and your hourly rate. Clients can then discover your listing and contact or book you.";

  // -------------------------------
  // 🔍 SEARCHING / FILTERING / MATCHING
  // -------------------------------
} else if (
  userMessage.includes("filter") ||
  userMessage.includes("filters") ||
  userMessage.includes("search") ||
  userMessage.includes("find jobs") ||
  userMessage.includes("browse jobs") ||
  userMessage.includes("browse workers") ||
  userMessage.includes("search workers")
) {
  reply =
    "ZYPPR-Trades will let you filter by:\n• Category (plumbing, electrical, moving, cleaning, etc.)\n• City or location\n• Hourly rate / budget\n• Keywords in the title or description\nThis makes it much faster to match the right worker to the right job.";

} else if (
  userMessage.includes("real time") ||
  userMessage.includes("matching") ||
  userMessage.includes("match me") ||
  userMessage.includes("auto match")
) {
  reply =
    "The goal of ZYPPR-Trades is to support real-time job matching: based on your skills or your job description, the system will surface the best matches for you to review.";

  // -------------------------------
  // 💬 MESSAGING / COMMUNICATION
  // -------------------------------
} else if (
  userMessage.includes("message") ||
  userMessage.includes("chat") ||
  userMessage.includes("contact worker") ||
  userMessage.includes("contact client") ||
  userMessage.includes("secure messaging")
) {
  reply =
    "Secure messaging will let clients and workers chat inside the platform so they can discuss job details, timing, and expectations without needing to share personal info right away.";

  // -------------------------------
  // 📅 SCHEDULING / AVAILABILITY
  // -------------------------------
} else if (
  userMessage.includes("schedule") ||
  userMessage.includes("availability") ||
  userMessage.includes("book time") ||
  userMessage.includes("when can you work")
) {
  reply =
    "Scheduling tools will help coordinate when the work actually happens. Workers can set availability and clients can request specific dates or time windows.";

  // -------------------------------
  // 💳 PAYMENTS / PAYPAL / SAFETY
  // -------------------------------
} else if (
  userMessage.includes("payment") ||
  userMessage.includes("pay") ||
  userMessage.includes("charge") ||
  userMessage.includes("paypal") ||
  userMessage.includes("card") ||
  userMessage.includes("checkout")
) {
  reply =
    "ZYPPR-Trades will support secure payment processing (for example, PayPal). The idea is that jobs can be paid for directly through the platform, making things safer for both sides. 💳";

} else if (
  userMessage.includes("safe") ||
  userMessage.includes("security") ||
  userMessage.includes("secure") ||
  userMessage.includes("scam")
) {
  reply =
    "The platform aims to keep things safe by using secure logins, secure payment integrations, and eventually reputation or review systems so you can see feedback about workers and clients.";

  // -------------------------------
  // 💵 PRICING / RATES
  // -------------------------------
} else if (
  userMessage.includes("price") ||
  userMessage.includes("cost") ||
  userMessage.includes("how much") ||
  userMessage.includes("rate") ||
  userMessage.includes("hourly")
) {
  reply =
    "Prices and hourly rates are usually set by the workers or by the client’s budget. You’ll be able to see the rate in each job post or worker listing and filter by your price range.";

  // -------------------------------
  // 🧭 PLATFORM STATUS / “COMING SOON”
  // -------------------------------
} else if (
  userMessage.includes("coming soon") ||
  userMessage.includes("ready yet") ||
  userMessage.includes("finished") ||
  userMessage.includes("beta") ||
  userMessage.includes("in development")
) {
  reply =
    "ZYPPR-Trades is still in development. Some features—like real-time matching, secure messaging, and full scheduling tools—are being built and will be rolled out over time.";

  // -------------------------------
  // 🧑‍💻 TECH / CLASS CONTEXT (OPTIONAL)
  // -------------------------------
} else if (
  userMessage.includes("tech stack") ||
  userMessage.includes("what is this built with") ||
  userMessage.includes("how is this made")
) {
  reply =
    "ZYPPR-Trades is being developed as a software engineering project. It uses a web stack with a database, backend APIs, and a modern frontend to demonstrate real-world job marketplace features.";

  // -------------------------------
  // 🙏 THANKS / CLOSING
  // -------------------------------
} else if (
  userMessage.includes("thanks") ||
  userMessage.includes("thank you") ||
  userMessage.includes("thx")
) {
  reply = "You’re welcome! 😊 Anything else you want to know about ZYPPR-Trades?";

  // -------------------------------
  // 🤣 FUN / LIGHT CHAT
  // -------------------------------
} else if (
  userMessage.includes("joke") ||
  userMessage.includes("funny")
) {
  reply =
    "Here’s one for you:\nWhy did the worker bring a ladder to the job? 🪜\nBecause the client said the job had *high expectations*! 😂";

  // -------------------------------
  // ❌ FALLBACK
  // -------------------------------
} else {
  reply =
    "I’m not sure about that yet 🤖. But I can help explain ZYPPR-Trades: posting jobs, worker listings, filters, matching, messaging, scheduling, and payments. Try asking about one of those!";
}

  res.json({ reply });
});

export default router;
