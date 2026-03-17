const { startLogin } = require('../../lib/scraper');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, sessionToken } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const expectedToken = Buffer.from(email).toString('base64');

  // 🔥 AUTO LOGIN
  if (sessionToken && sessionToken === expectedToken) {
    try {
      const result = await startLogin(email, null, true);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(401).json({ error: 'Session expired' });
    }
  }

  try {
    const result = await startLogin(email, password, false);

    if (!result.needsCaptcha) {
      const sessionId = Buffer.from(email).toString('base64');

      res.setHeader(
        'Set-Cookie',
        `sessionId=${sessionId}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=86400`
      );

      result.sessionToken = sessionId;
    }

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}