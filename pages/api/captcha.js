// Captcha API — launches browser session and returns solved captcha image
// When BACKEND_URL is set (Vercel), proxies to Railway backend instead of running Playwright locally
export const config = { api: { bodyParser: true }, maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Proxy mode: forward to Railway backend when running on Vercel
  if (process.env.BACKEND_URL) {
    try {
      const r = await fetch(process.env.BACKEND_URL + '/api/captcha', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await r.json();
      return res.status(r.status).json(data);
    } catch (e) {
      return res.status(502).json({ error: 'Backend unreachable. Please try again.' });
    }
  }

  const { solveCaptcha } = require('../../lib/scraper');
  const { sessionId, solution } = req.body;
  if (!sessionId || !solution) return res.status(400).json({ error: 'Session ID and solution required.' });
  try {
    const result = await solveCaptcha(sessionId, solution);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Captcha error:', err.message);
    return res.status(500).json({ error: err.message || 'Failed to submit captcha.' });
  }
}