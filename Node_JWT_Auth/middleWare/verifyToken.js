const jwt = require('jsonwebtoken')
const redisClient = require('../config/redis')
const verifyToken = async(req, res, next) => {
  const header = req.header('Authorization')
  if (!header) return res.status(401).send('Access denied. No token provided')

  const token = header.split(' ')[1]


//heck if token is blacklisted in Redis
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    console.log(isBlacklisted);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted. Please login again.' });
    }

  jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) return res.status(400).send('Invalid token')
    req.user = user
    next()
  })
}

module.exports = verifyToken
