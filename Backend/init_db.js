const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
    let connection;
    try {
        // Connect to MySQL server (without specifying database yet)
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            // It's safer to require a password and not have a default.
            // The script will fail if DB_PASSWORD is not set.
            password: process.env.DB_PASSWORD
        });
        console.log('Connected to MySQL server...');

        // 1. Create Database
        await connection.query("CREATE DATABASE IF NOT EXISTS ecommerce_db");
        console.log("Database 'ecommerce_db' created or checked.");

        // 2. Select the Database
        await connection.changeUser({ database: 'ecommerce_db' });

        // 3. Create Products Table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image_url VARCHAR(255)
            )
        `;
        await connection.query(createTableQuery);
        console.log("Table 'products' created or checked.");

        // 4. Insert Sample Data (only if table is empty)
        const [rows] = await connection.query("SELECT COUNT(*) as count FROM products");
        if (rows[0].count === 0) {
            const sql = "INSERT INTO products (name, price, image_url) VALUES ?";
            const values = [
                ['Facial Cleanser', 29.00, '/assets/images/product-01.jpg'],
                ['Bio-shroom Serum', 29.00, '/assets/images/product-02.jpg'],
                ['Eye Cream', 29.00, '/assets/images/product-03.jpg'],
                ['Facial Treatment', 29.00, '/assets/images/product-04.jpg'],
                ['Makeup', 29.00, '/assets/images/product-05.jpg'],
                ['Facial Cleanser', 20.00, '/assets/images/product-06.jpg'],
                ['Bio-shroom Serum', 24.00, '/assets/images/product-07.jpg'],
                ['Eye Cream', 25.00, '/assets/images/product-08.jpg'],
                ['Facial Treatment', 23.00, '/assets/images/product-09.jpg'],
                ['Makeup', 21.00, '/assets/images/product-05.jpg']
            ];
            await connection.query(sql, [values]);
            console.log("Sample products inserted successfully.");
        } else {
            console.log("Products table already contains data. Skipping insertion.");
        }
    } catch (err) {
        console.error('Database initialization failed:', err);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
        console.log('Database script finished.');
    }
}

initializeDatabase();