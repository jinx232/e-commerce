const mysql = require('mysql2');

// Connect to MySQL server (without specifying database yet)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'emmaNUEL@1' // Using the password from your server.js
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL server...');

    // 1. Create Database
    db.query("CREATE DATABASE IF NOT EXISTS ecommerce_db", (err) => {
        if (err) throw err;
        console.log("Database 'ecommerce_db' created or checked.");

        // 2. Select the Database
        db.changeUser({ database: 'ecommerce_db' }, (err) => {
            if (err) throw err;

            // 3. Create Products Table
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    price DECIMAL(10, 2) NOT NULL,
                    image_url VARCHAR(255)
                )
            `;

            db.query(createTableQuery, (err) => {
                if (err) throw err;
                console.log("Table 'products' created or checked.");

                // 4. Insert Sample Data
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

                db.query(sql, [values], (err) => {
                    if (err) {
                        console.log("Note: Data might already exist or error occurred:", err.message);
                    } else {
                        console.log("Sample products inserted successfully.");
                    }
                    process.exit(); // Exit the script
                });
            });
        });
    });
});