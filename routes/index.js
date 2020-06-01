
const route = require('express').Router()
const creatorRoute = require('./creator')
const clientRoute = require('./client')
const adminRoute = require('./admin')
const userRoute = require('./user')
const contestRoute = require('./contest')
const participationRoute = require('./participation')

route.use('/', userRoute)
route.use('/creator', creatorRoute)
route.use('/client', clientRoute)
route.use('/admin', adminRoute)
route.use('/contest', contestRoute)
route.use('/participation', participationRoute)

module.exports = route