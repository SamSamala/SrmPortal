// pages/api/billing/verify.js — Verify Razorpay payment and activate subscription
const crypto = require('crypto');
const razorpay = require('../../../lib/razorpay');
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

  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;
  if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment fields' });
  }

  // Verify HMAC signature
  const expectedSig = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
    .digest('hex');

  const sigBuffer = Buffer.from(razorpay_signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSig, 'hex');

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return res.status(400).json({ error: 'Invalid payment signature' });
  }

  // Fetch subscription to get current_period_end
  let sub;
  try {
    sub = await razorpay.subscriptions.fetch(razorpay_subscription_id);
  } catch (e) {
    console.error('Razorpay fetch subscription error:', e);
    return res.status(502).json({ error: 'Payment provider error' });
  }

  const current_period_end = sub.current_end ? sub.current_end * 1000 : Date.now() + 30 * 24 * 60 * 60 * 1000;

  await upsertSubscription(email, {
    plan:                     'pro',
    status:                   'active',
    razorpay_subscription_id: razorpay_subscription_id,
    razorpay_customer_id:     sub.customer_id || null,
    current_period_end,
  });

  return res.status(200).json({ ok: true, plan: 'pro', currentPeriodEnd: current_period_end });
}
