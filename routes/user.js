const route = require('express').Router()
const UserController = require('../controllers/user')
const verifyToken = require("../middlewares/verifyToken")

route.post('/login', UserController.login)
route.get('/user', verifyToken, UserController.getUserData)
route.put('/update', verifyToken, UserController.updateUser)
route.put('/update/password', verifyToken, UserController.changePassword)

module.exports = route