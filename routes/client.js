const route = require('express').Router()
const ClientController = require('../controllers/client')
const verifyToken = require("../middlewares/verifyToken")

route.post('/register', ClientController.register)

module.exports = route