const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const header = req.header('Authorization')
  if (!header) return res.status(401).send('Access denied. No token provided')

  const token = header.split(' ')[1]
  jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) return res.status(400).send('Invalid token')
    req.user = user
    next()
  })
}

module.exports = verifyToken
