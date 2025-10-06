const express = require('express')
const router = express.Router()
const userController = require('../controller/authController')
const verifyToken = require('../middleWare/verifyToken')
router.post('/user/register', userController.createUser)
router.get('/user/profile/:id', verifyToken, userController.getUser)
module.exports = router