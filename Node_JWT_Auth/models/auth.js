const db = require('../config/db');


const addUser = (req, res, callback) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO userdata (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], callback); 
};


const findUser = (id, callback) => {
  const query = 'SELECT id, name, email FROM userdata WHERE id = ?';
  db.query(query, [id], callback);  
};

module.exports = { addUser, findUser};

