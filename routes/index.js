
const route = require('express').Router()
const creatorRoute = require('./creator')
const clientRoute = require('./client')
const adminRoute = require('./admin')
const userRoute = require('./user')
const contestRoute = require('./contest')
const participationRoute = require('./participation')
const projectRoute = require('./project')
const paymentRoute = require('./contest-payment')
const projectPaymentRoute = require('./project-payment')

route.use('/', userRoute)
route.use('/creator', creatorRoute)
route.use('/client', clientRoute)
route.use('/admin', adminRoute)
route.use('/contest', contestRoute)
route.use('/participation', participationRoute)
route.use('/project', projectRoute)
route.use('/payment', paymentRoute)
route.use('/payment-project', projectPaymentRoute)

module.exports = route