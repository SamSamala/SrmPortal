// pages/api/health.js — DB connectivity check endpoint
import db from '../../lib/db';

export default async function handler(req, res) {
  try {
    await db.query('SELECT 1');
    res.status(200).json({ status: 'ok', db: 'connected' });
  } catch (e) {
    res.status(500).json({ status: 'error', db: 'disconnected', message: e.message });
  }
}
