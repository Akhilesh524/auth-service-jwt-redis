const auth = require('../models/auth');
const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
  const { name, email, password } = req.body;

  auth.addUser(req, res, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    const user = {
      id: result.insertId,
      name,
      email
    };

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.jwt_secret,
      { expiresIn: '1h' }
    );

    res.status(201).json({ user, token });
  });
};

const getUser = (req, res) => {
  const userId = req.user.id;

  auth.findUser(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'DB error', error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result[0]);
  });
};

module.exports = { createUser, getUser };


