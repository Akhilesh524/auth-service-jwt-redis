const auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const redisClient = require('../config/redis')

// ---------------------- CREATE USER ----------------------
const createUser = (req, res) => {
  const { name, email, password } = req.body;

  // Hash password before storing
  const hashedPassword = bcrypt.hashSync(password, 10);

  req.body.password = hashedPassword;

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

    res.status(201).json({ message: 'User registered successfully', user, token });
  });
};

// ---------------------- LOGIN USER ----------------------
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  auth.findByEmail(email, async (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result[0];

    console.log("Entered password:", password);
    console.log("DB stored password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('JWT Secret:', process.env.jwt_secret);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.jwt_secret,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  });
};

// ---------------------- GET USER ----------------------
const getUser = (req, res) => {
  const userId = req.user.id;

  console.log(userId);

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


//----------------------logoutUser---------------------------
const logoutUser=async(req,res)=>{
  try {
    const token = req.token;
    const decoded = req.user;

    // Calculate remaining expiry time of JWT
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    // Store token in Redis with expiry equal to remaining time
    await redisClient.setEx(`blacklist:${token}`, expiresIn, 'true');

    return res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during logout' });
  }
}
module.exports = { createUser, loginUser, getUser,logoutUser };



