// pages/api/content.js — CRUD for guide/wellness content (public GET, admin write)
const db = require('../../lib/db');
const { randomUUID } = require('crypto');

async function initDb() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS content (
      id          TEXT PRIMARY KEY,
      section     TEXT NOT NULL,
      title       TEXT,
      body        TEXT,
      image_url   TEXT,
      link_url    TEXT,
      link_label  TEXT,
      sort_order  INT NOT NULL DEFAULT 0,
      created_at  BIGINT NOT NULL,
      updated_at  BIGINT NOT NULL
    )
  `);
}

function checkAdmin(req, res) {
  if (!process.env.ADMIN_KEY || req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  try { await initDb(); } catch(e) { return res.status(500).json({ error: 'DB init failed: ' + e.message }); }

  if (req.method === 'GET') {
    const { section } = req.query;
    if (!section) return res.status(400).json({ error: 'section required' });
    try {
      const { rows } = await db.query('SELECT * FROM content WHERE section=$1 ORDER BY sort_order ASC, created_at ASC', [section]);
      return res.status(200).json(rows.map(r => ({
        id: r.id, section: r.section, title: r.title, body: r.body,
        imageUrl: r.image_url, linkUrl: r.link_url, linkLabel: r.link_label,
        sortOrder: r.sort_order,
      })));
    } catch(e) { return res.status(500).json({ error: e.message }); }
  }

  if (req.method === 'POST') {
    if (!checkAdmin(req, res)) return;
    const { section, title, body, imageUrl, linkUrl, linkLabel, sortOrder } = req.body;
    if (!section) return res.status(400).json({ error: 'section required' });
    try {
      const id = randomUUID();
      const now = Date.now();
      await db.query(
        'INSERT INTO content (id,section,title,body,image_url,link_url,link_label,sort_order,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$9)',
        [id, section, title||null, body||null, imageUrl||null, linkUrl||null, linkLabel||null, sortOrder||0, now]
      );
      return res.status(201).json({ id });
    } catch(e) { return res.status(500).json({ error: e.message }); }
  }

  if (req.method === 'PUT') {
    if (!checkAdmin(req, res)) return;
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id required' });
    const { title, body, imageUrl, linkUrl, linkLabel, sortOrder } = req.body;
    try {
      const now = Date.now();
      await db.query(
        'UPDATE content SET title=$1,body=$2,image_url=$3,link_url=$4,link_label=$5,sort_order=$6,updated_at=$7 WHERE id=$8',
        [title||null, body||null, imageUrl||null, linkUrl||null, linkLabel||null, sortOrder||0, now, id]
      );
      return res.status(200).json({ ok: true });
    } catch(e) { return res.status(500).json({ error: e.message }); }
  }

  if (req.method === 'DELETE') {
    if (!checkAdmin(req, res)) return;
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id required' });
    try {
      await db.query('DELETE FROM content WHERE id=$1', [id]);
      return res.status(200).json({ ok: true });
    } catch(e) { return res.status(500).json({ error: e.message }); }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
