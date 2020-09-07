const route = require('express').Router()
const AdminController = require('../controllers/admin')
const verifyToken = require("../middlewares/verifyToken")

route.post('/register', AdminController.register)

module.exports = route