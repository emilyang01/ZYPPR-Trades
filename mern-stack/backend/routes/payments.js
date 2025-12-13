// routes/payments.js
import express from "express";
import { requireAuth } from "../middleware/auth.js";
import Payment from "../models/Payment.js";
import {
  createPayPalOrder,
  capturePayPalOrder,
} from "../services/paypalClient.js";


const router = express.Router();

/**
 * POST /api/payments/create-order
 */
// routes/payments.js
router.post("/create-order", requireAuth, async (req, res) => {
  try {
    const { currency = "USD", jobId, providerId } = req.body;

    // ✅ FORCE amount on server (don’t trust client)
    const amount = 27.0;

    const paypalOrder = await createPayPalOrder({
      value: amount.toFixed(2), // "27.00"
      currency,
      description: jobId ? `Payment for job ${jobId}` : "ZYPPR Trades Payment",
      // optional: return/cancel urls if your paypalClient supports it
      // return_url: "http://localhost:5173/payment/success",
      // cancel_url: "http://localhost:5173/payment/cancel",
    });

    const payment = await Payment.create({
      userId: req.user.id,
      jobId,
      providerId,
      amount,
      currency,
      paypalOrderId: paypalOrder.id,
      status: "CREATED",
    });

    res.json({ paypalOrder, payment });
  } catch (err) {
    console.error("Create-order error:", err);
    res.status(500).json({ message: "Error creating payment" });
  }
});


/**
 * POST /api/payments/capture
 */
router.post("/capture", requireAuth, async (req, res) => {
  try {
    const { orderId } = req.body;

    const capture = await capturePayPalOrder(orderId);

    await Payment.findOneAndUpdate(
      { paypalOrderId: orderId },
      { status: "COMPLETED" }
    );

    res.json(capture);
  } catch (err) {
    console.error("Capture error:", err);
    res.status(500).json({ message: "Capture failed" });
  }
});

export default router;
