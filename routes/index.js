
const route = require('express').Router()
const userRoute = require('./user')

route.use('/', userRoute)

module.exports = route