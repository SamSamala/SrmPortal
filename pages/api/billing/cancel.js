// pages/api/billing/cancel.js — Cancel subscription at end of current period
const razorpay = require('../../../lib/razorpay');
const { requireSession } = require('../../../lib/subscription');
const { getSubscription, cancelSubscription } = require('../../../lib/db');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let email;
  try {
    ({ email } = requireSession(req));
  } catch (e) {
    return res.status(e.status).json({ error: e.error });
  }

  const row = await getSubscription(email);
  if (!row || row.plan !== 'pro' || !row.razorpay_subscription_id) {
    return res.status(400).json({ error: 'No active subscription' });
  }

  try {
    await razorpay.subscriptions.cancel(row.razorpay_subscription_id, { cancel_at_cycle_end: 1 });
  } catch (e) {
    // If already cancelled on Razorpay side, still update DB
    console.error('Razorpay cancel error (proceeding anyway):', e.message);
  }

  await cancelSubscription(email);

  return res.status(200).json({
    ok: true,
    accessUntil: row.current_period_end ? Number(row.current_period_end) : null,
  });
}
