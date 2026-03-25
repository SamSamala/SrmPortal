// lib/subscription.js — Session decoding helper for billing routes

/**
 * Extracts and returns the logged-in user's email from the sessionId cookie.
 * Throws { status, error } if the session is missing or malformed.
 */
function requireSession(req) {
  const token = req.cookies?.sessionId;
  if (!token) throw { status: 401, error: 'Login required' };
  try {
    const email = Buffer.from(token, 'base64').toString('utf8');
    if (!email || !email.includes('@')) throw new Error('bad email');
    return { email };
  } catch {
    throw { status: 401, error: 'Invalid session' };
  }
}

module.exports = { requireSession };
