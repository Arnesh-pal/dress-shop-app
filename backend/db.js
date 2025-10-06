const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Vercel Postgres
    },
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
};