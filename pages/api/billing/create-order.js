// pages/api/billing/create-order.js — Create a Razorpay one-time order for Pro access
const razorpay = require('../../../lib/razorpay');
const { requireSession } = require('../../../lib/subscription');
const { isProActive } = require('../../../lib/db');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let email;
  try {
    ({ email } = requireSession(req));
  } catch (e) {
    return res.status(e.status).json({ error: e.error });
  }

  const alreadyPro = await isProActive(email);
  if (alreadyPro) return res.status(200).json({ error: 'already_pro' });

  try {
    const order = await razorpay.orders.create({
      amount:   5000,   // ₹50 in paise
      currency: 'INR',
      receipt:  `pro_${Date.now()}`,
    });
    return res.status(200).json({
      orderId: order.id,
      keyId:   process.env.RAZORPAY_KEY_ID,
    });
  } catch (e) {
    console.error('Razorpay create order error:', e);
    return res.status(502).json({ error: 'Payment provider error' });
  }
}
