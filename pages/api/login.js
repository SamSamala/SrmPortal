const { startLogin } = require('../../lib/scraper');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, sessionToken } = req.body || {};

  try {
    const useSession = !!(sessionToken && sessionToken === Buffer.from(email).toString('base64'));

    const result = await startLogin(email, password, useSession);

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