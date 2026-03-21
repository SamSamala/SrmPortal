// pages/api/subscribe.js — saves subscriber email to Redis for newsletter notifications
const redis = require('../../lib/redis');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email required' });
  await redis.sadd('srm:subscribers', email);
  res.status(200).json({ ok: true });
}
