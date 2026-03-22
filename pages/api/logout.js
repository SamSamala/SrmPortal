// Logout API — closes Playwright browser session and clears Redis session data
// When BACKEND_URL is set (Vercel), proxies to Railway backend instead of running Playwright locally

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Proxy mode: forward to Railway backend when running on Vercel
  if (process.env.BACKEND_URL) {
    try {
      await fetch(process.env.BACKEND_URL + '/api/logout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(req.body),
      });
    } catch (e) {}
    return res.status(200).json({ success: true });
  }

  const { logoutUser } = require('../../lib/scraper');
  const { email } = req.body || {};
  try {
    if (email) logoutUser(email);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(200).json({ success: true }); // always succeed on logout
  }
}