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
router.post("/create-order", requireAuth, async (req, res) => {
  try {
    const { amount, currency = "USD", jobId, providerId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be > 0" });
    }

    // Create PayPal order
    const paypalOrder = await createPayPalOrder({
      value: amount,
      currency,
      description: jobId ? `Payment for job ${jobId}` : "ZYPPR Trades Payment",
    });

    // Store in DB
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
    console.error(err);
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
    console.error(err);
    res.status(500).json({ message: "Capture failed" });
  }
});

export default router;
