const request = require('supertest');
const app = require('../app');
const { pool } = require('../db'); // Import the pool

// This will run once after all tests in this file have finished
afterAll(() => {
    pool.end(); // Close the database connection pool
});

describe('Products API', () => {
    it('should return a list of products', async () => {
        const response = await request(app).get('/api/products');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        const firstProduct = response.body[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('imageUrl'); // Corrected property name
        expect(firstProduct).toHaveProperty('tags');
    });
});