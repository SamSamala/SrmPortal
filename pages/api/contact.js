// pages/api/contact.js — Submit a contact message (no auth required)
const { randomUUID } = require('crypto');
const { insertContactMessage } = require('../../lib/db');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (name.length > 100) return res.status(400).json({ error: 'name too long (max 100 chars)' });
  if (message.length > 5000) return res.status(400).json({ error: 'message too long (max 5000 chars)' });

  try {
    const id = randomUUID();
    await insertContactMessage(id, name.trim(), email.trim().toLowerCase(), subject?.trim() || null, message.trim());
    return res.status(201).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
