const { logoutUser } = require('../../lib/scraper');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email } = req.body || {};
  try {
    if (email) logoutUser(email);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(200).json({ success: true }); // always succeed on logout
  }
}