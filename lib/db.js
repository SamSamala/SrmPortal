// lib/db.js — PostgreSQL pool singleton for internships data
const { Pool } = require('pg');

let pool;

if (!pool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  });
}

module.exports = pool;
