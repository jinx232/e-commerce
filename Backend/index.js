require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000; // You can use any port you like

// Check for required environment variables before trying to connect
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error('FATAL ERROR: Database credentials are not set in a .env file.');
  console.error('Please create a .env file in the /Backend directory with your database details.');
  process.exit(1);
}

// Database connection details are loaded from the .env file
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the MySQL database.');
});

app.get('/', (req, res) => {
  res.send('Hello from your E-commerce Backend!');
});

app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
