require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { query } = require('./db');

const app = express();
const PORT = 3001; // We can still define it here for clarity

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', async (req, res) => {
    try {
        const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${PORT}`;
        const selectQuery = `
      SELECT id, name, price::float, '${baseUrl}' || imageUrl as "imageUrl", tags 
      FROM products 
      ORDER BY id ASC;
    `;
        const { rows } = await query(selectQuery);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/checkout', (req, res) => {
    console.log('--- CHECKOUT RECEIVED ---');
    console.log('Cart Items:', req.body.cart);
    res.json({ message: 'Checkout successful! Thank you for your order.' });
});

module.exports = app; // Export the app for testing and for our server