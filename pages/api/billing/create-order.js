// pages/api/billing/create-order.js — Create a Razorpay subscription for the logged-in user
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

  // Don't create a duplicate subscription
  const alreadyPro = await isProActive(email);
  if (alreadyPro) return res.status(200).json({ alreadySubscribed: true });

  try {
    const sub = await razorpay.subscriptions.create({
      plan_id:        process.env.RAZORPAY_PLAN_ID,
      total_count:    120,   // ~10 years of monthly cycles
      quantity:       1,
      customer_notify: 1,
    });
    return res.status(200).json({
      subscriptionId: sub.id,
      keyId:          process.env.RAZORPAY_KEY_ID,
    });
  } catch (e) {
    console.error('Razorpay create subscription error:', e);
    return res.status(502).json({ error: 'Payment provider error' });
  }
}
