// pages/api/billing/status.js — Return current subscription status for logged-in user
const { requireSession } = require('../../../lib/subscription');
const { getSubscription } = require('../../../lib/db');

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  let email;
  try {
    ({ email } = requireSession(req));
  } catch (e) {
    return res.status(e.status).json({ error: e.error });
  }

  const row = await getSubscription(email);

  if (!row) {
    return res.status(200).json({ plan: 'free', status: 'active', isPro: false });
  }

  const isPro = row.plan === 'pro' && row.status === 'active' && Number(row.current_period_end) > Date.now();

  return res.status(200).json({
    plan:                     row.plan,
    status:                   row.status,
    isPro,
    currentPeriodEnd:         row.current_period_end ? Number(row.current_period_end) : null,
    razorpaySubscriptionId:   row.razorpay_subscription_id || null,
  });
}
