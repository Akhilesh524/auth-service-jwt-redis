const db = require('../config/db');


const addUser = (req, res, callback) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO userdata (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], callback); 
};

// findByEmail
const findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM userdata WHERE email = ?';
  db.query(sql, [email], callback);
};


const findUser = (id, callback) => {
  const query = 'SELECT id, name, email FROM userdata WHERE id = ?';
  db.query(query, [id], callback);  
};

module.exports = { addUser, findByEmail,findUser};

