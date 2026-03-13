const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

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

// Serve static files from the 'docs' directory
app.use(express.static(path.join(__dirname, '../docs')));

// API endpoint to get products
app.get('/api/products', (req, res) => {
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

// All other GET requests not handled before will return the frontend's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs', 'index.html'));
});
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
