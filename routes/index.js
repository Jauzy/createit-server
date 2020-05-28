
const route = require('express').Router()
const creatorRoute = require('./creator')
const clientRoute = require('./client')
const adminRoute = require('./admin')
const userRoute = require('./user')
const contestRoute = require('./contest')

route.use('/', userRoute)
route.use('/creator', creatorRoute)
route.use('/client', clientRoute)
route.use('/admin', adminRoute)
route.use('/contest', contestRoute)

module.exports = route