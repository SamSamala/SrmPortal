// pages/api/billing/webhook.js — Razorpay webhook handler for subscription lifecycle events
// IMPORTANT: bodyParser must be disabled — Razorpay signs the raw body bytes
import crypto from 'crypto';
const db = require('../../../lib/db');

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function getEmailBySubId(subId) {
  try {
    const { rows } = await db.query(
      'SELECT email FROM subscriptions WHERE razorpay_subscription_id=$1',
      [subId]
    );
    return rows[0]?.email || null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const rawBody = await getRawBody(req);
  const signature = req.headers['x-razorpay-signature'];

  if (!signature) return res.status(400).json({ error: 'Missing signature' });

  // Verify webhook signature
  const expectedSig = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expectedSig, 'hex');

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const payload = JSON.parse(rawBody.toString('utf8'));
  const event = payload.event;
  const entity = payload.payload?.subscription?.entity;

  if (!entity) return res.status(200).json({ ok: true });

  const subId = entity.id;
  const email = await getEmailBySubId(subId);

  if (!email) {
    // Unknown subscription — acknowledge to prevent Razorpay retries
    return res.status(200).json({ ok: true });
  }

  if (event === 'subscription.charged') {
    // Successful renewal — extend access
    const current_period_end = entity.current_end ? entity.current_end * 1000 : null;
    await db.upsertSubscription(email, {
      plan:                     'pro',
      status:                   'active',
      razorpay_subscription_id: subId,
      razorpay_customer_id:     entity.customer_id || null,
      current_period_end,
    });
  } else if (event === 'subscription.halted') {
    // All payment retries exhausted — revoke access
    await db.upsertSubscription(email, {
      status: 'expired',
    });
  } else if (event === 'subscription.cancelled') {
    // Cancellation confirmed by Razorpay
    await db.upsertSubscription(email, {
      status: 'canceled',
    });
  }

  // Always return 200 — Razorpay retries on non-200 responses
  return res.status(200).json({ ok: true });
}
