// services/paypalClient.js
import dotenv from "dotenv";
import fetch from "node-fetch"; // npm install node-fetch
dotenv.config();

const PAYPAL_API_BASE =
  process.env.PAYPAL_API || "https://api-m.sandbox.paypal.com";
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
  console.warn("⚠️ PAYPAL_CLIENT_ID or PAYPAL_SECRET missing in .env");
}

async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
    "base64"
  );

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("PayPal token error:", text);
    throw new Error("Failed to get PayPal access token");
  }

  const data = await res.json();
  return data.access_token;
}

export async function createPayPalOrder({ value, currency, description }) {
  const accessToken = await getAccessToken();

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: Number(value).toFixed(2),
          },
          description,
        },
      ],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("PayPal create order error:", data);
    throw new Error("Failed to create PayPal order");
  }

  return data;
}

export async function capturePayPalOrder(orderId) {
  const accessToken = await getAccessToken();

  const res = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("PayPal capture error:", data);
    throw new Error("Failed to capture PayPal order");
  }

  return data;
}
