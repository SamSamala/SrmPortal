// pages/api/legal.js — Serve terms/privacy policy content
// Admin manages content via POST/PUT/DELETE /api/content with section='terms' or section='privacy'
// Falls back to built-in defaults if no DB content exists yet
const db = require('../../lib/db');

const DEFAULTS = {
  terms: `# Terms of Service

**Last updated: ${new Date().getFullYear()}**

By using SRM Portal, you agree to these terms.

## 1. Use of Service
SRM Portal is an unofficial student utility tool. It is not affiliated with or endorsed by SRM Institute of Science and Technology.

## 2. Account & Credentials
You are responsible for keeping your SRM portal credentials secure. We store your credentials in encrypted form solely to enable automatic session refresh.

## 3. Subscription
Pro subscriptions are billed monthly. You may cancel at any time and retain access until the end of the billing period. No refunds are issued for partial months.

## 4. Acceptable Use
You may not use this service to scrape data for third parties, attempt to overload the SRM portal, or violate SRM Institute's terms of use.

## 5. Disclaimer
This service is provided "as is" without warranties of any kind. We are not responsible for incorrect or missing data from the SRM portal.

## 6. Changes
We may update these terms at any time. Continued use of the service constitutes acceptance of the updated terms.`,

  privacy: `# Privacy Policy

**Last updated: ${new Date().getFullYear()}**

## 1. Information We Collect
- **SRM credentials**: Stored in AES-256-GCM encrypted form, used only to refresh your session automatically.
- **Academic data**: Attendance, marks, and timetable fetched from the SRM portal and cached temporarily.
- **Email address**: Used as your account identifier.
- **Payment information**: Processed by Razorpay. We do not store card details.

## 2. How We Use Your Information
- To provide the SRM Portal service (attendance tracking, mark monitoring)
- To maintain your session and re-authenticate when needed
- To process subscription payments

## 3. Data Sharing
We do not sell or share your personal data with third parties. Razorpay processes payments under their own privacy policy.

## 4. Data Retention
- Session data: 24 hours
- Cached academic data: 24 hours
- Encrypted credentials: Until you log out or delete your account

## 5. Security
We use AES-256-GCM encryption for stored credentials and HTTPS for all communication.

## 6. Contact
For privacy concerns, use the Contact Us page.`,
};

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { section } = req.query;
  if (!section || !['terms', 'privacy'].includes(section)) {
    return res.status(400).json({ error: 'section must be "terms" or "privacy"' });
  }

  try {
    const { rows } = await db.query(
      'SELECT body FROM content WHERE section=$1 ORDER BY sort_order ASC, created_at ASC LIMIT 1',
      [section]
    );
    const body = rows[0]?.body || DEFAULTS[section];
    return res.status(200).json({ section, content: body });
  } catch (e) {
    // Fall back to defaults on DB error
    return res.status(200).json({ section, content: DEFAULTS[section] });
  }
}
