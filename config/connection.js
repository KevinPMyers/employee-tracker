const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: '?T!AatMaR_7z',
  database: 'DBemployee_tracker'
});

module.exports = db;
