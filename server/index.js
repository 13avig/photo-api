const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PASSWORD = process.env.REACT_APP_DATABASE_PASSWORD

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: PASSWORD,
  database: 'company_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.get('/random', (req, res) => {
  db.query('SELECT * FROM employees ORDER BY RAND() LIMIT 1', (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
