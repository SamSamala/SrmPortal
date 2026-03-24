// pages/api/data.js — returns latest cached data for the logged-in user
// Frontend polls this after login to pick up background refresh updates

const redis = require('../../lib/redis');
const { getStudentCache } = require('../../lib/db');

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const token = req.cookies?.sessionId;
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  let email;
  try { email = Buffer.from(token, 'base64').toString('utf8'); } catch {
    return res.status(401).json({ error: 'Invalid session' });
  }

  try {
    const raw = await redis.get(`data:v6:${email}`);
    if (raw) {
      const data = JSON.parse(raw);
      // Tell the frontend whether a background refresh is currently running
      const refreshing = !!(await redis.get(`refresh_lock:${email}`).catch(() => null));
      return res.status(200).json({ data, refreshedAt: data.refreshedAt || null, refreshing });
    }

    const pgData = await getStudentCache(email);
    if (pgData) {
      return res.status(200).json({ data: pgData, refreshedAt: null, refreshing: false });
    }

    return res.status(404).json({ error: 'No cached data' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
