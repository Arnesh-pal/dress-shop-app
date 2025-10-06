const { query } = require('./db');

async function seedDatabase() {
    try {
        // Drop table if it exists to start fresh
        await query('DROP TABLE IF EXISTS products;');
        console.log('Dropped existing products table.');

        // Create the products table
        const createTableQuery = `
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        imageUrl VARCHAR(255),
        tags TEXT[]
      );
    `;
        await query(createTableQuery);
        console.log('Products table created.');

        // Your product data
        const products = [
            { id: 1, name: 'Summer Breeze Sundress', price: 49.99, imageUrl: `/images/dress1.jpg`, tags: ['summer', 'casual'] },
            { id: 2, name: 'Evening Gala Gown', price: 129.99, imageUrl: `/images/dress2.jpg`, tags: ['formal', 'evening'] },
            { id: 3, name: 'Casual Denim Dress', price: 65.00, imageUrl: `/images/dress3.jpg`, tags: ['casual', 'denim'] },
            { id: 4, name: 'Floral Maxi Dress', price: 79.50, imageUrl: `/images/dress4.jpg`, tags: ['summer', 'floral', 'maxi'] },
            { id: 5, name: 'Boho Chic Tunic', price: 55.00, imageUrl: `/images/dress5.jpg`, tags: ['casual', 'boho'] },
            { id: 6, name: 'Little Black Dress', price: 89.99, imageUrl: `/images/dress6.jpg`, tags: ['formal', 'evening', 'cocktail'] },
        ];

        // Insert each product into the table
        for (const product of products) {
            const insertQuery = `
            INSERT INTO products (name, price, imageUrl, tags)
            VALUES ($1, $2, $3, $4);
        `;
            const values = [product.name, product.price, product.imageUrl, product.tags];
            await query(insertQuery, values);
        }

        console.log('Seeding completed!');

    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

seedDatabase();