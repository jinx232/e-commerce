const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 5000; // You can use any port you like

// TODO: Update with your actual database credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password_here',
  database: 'your_database_name'
});

app.get('/', (req, res) => {
  res.send('Hello from your E-commerce Backend!');
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
