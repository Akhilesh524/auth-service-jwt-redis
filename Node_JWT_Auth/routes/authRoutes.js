const express = require('express')
const router = express.Router()
const userController = require('../controller/authController')
const verifyToken = require('../middleWare/verifyToken')
router.post('/user/register', userController.createUser)
router.post('/user/login', userController.loginUser)
router.get('/user/profile', verifyToken, userController.getUser)
module.exports = router