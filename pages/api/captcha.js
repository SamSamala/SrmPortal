// Captcha API — launches browser session and returns solved captcha image
import { solveCaptcha } from '../../lib/scraper';
export const config = { api: { bodyParser: true }, maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
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