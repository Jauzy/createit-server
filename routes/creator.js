const route = require('express').Router()
const CreatorController = require('../controllers/creator')
const verifyToken = require("../middlewares/verifyToken")

route.post('/register', CreatorController.register)

module.exports = route