// pages/api/bug-report.js — Submit a bug report (session optional)
const { randomUUID } = require('crypto');
const { insertBugReport } = require('../../lib/db');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { subject, description } = req.body;
  if (!subject || !description) {
    return res.status(400).json({ error: 'subject and description are required' });
  }
  if (subject.length > 200) return res.status(400).json({ error: 'subject too long (max 200 chars)' });
  if (description.length > 5000) return res.status(400).json({ error: 'description too long (max 5000 chars)' });

  // Extract email from session if logged in (optional)
  let email = null;
  const token = req.cookies?.sessionId;
  if (token) {
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf8');
      if (decoded.includes('@')) email = decoded;
    } catch {}
  }

  try {
    const id = randomUUID();
    await insertBugReport(id, email, subject.trim(), description.trim());
    return res.status(201).json({ ok: true, id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
