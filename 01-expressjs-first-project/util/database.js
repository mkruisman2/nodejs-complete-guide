const mysql = require('mysql2');

const password = require('./data');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: password
});

module.exports = pool.promise();