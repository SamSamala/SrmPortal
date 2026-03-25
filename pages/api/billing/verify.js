// pages/api/billing/verify.js — Verify Razorpay payment and activate Pro
const crypto = require('crypto');
const { requireSession } = require('../../../lib/subscription');
const { upsertSubscription } = require('../../../lib/db');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let email;
  try {
    ({ email } = requireSession(req));
  } catch (e) {
    return res.status(e.status).json({ error: e.error });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment fields' });
  }

  // Verify HMAC signature: order_id|payment_id
  const expectedSig = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSig !== razorpay_signature) {
    return res.status(400).json({ error: 'Invalid payment signature' });
  }

  // Grant Pro access for 1 month
  const current_period_end = Date.now() + 30 * 24 * 60 * 60 * 1000;

  await upsertSubscription(email, {
    plan:   'pro',
    status: 'active',
    razorpay_subscription_id: razorpay_order_id,
    current_period_end,
  });

  return res.status(200).json({ ok: true, plan: 'pro', currentPeriodEnd: current_period_end });
}
