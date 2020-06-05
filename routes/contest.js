const route = require('express').Router()
const ContestController = require('../controllers/contest')
const verifyToken = require("../middlewares/verifyToken")

route.get('/get', verifyToken, ContestController.getAllContest)
route.get('/get/published', verifyToken, ContestController.getPublished)
route.get('/get/client', verifyToken, ContestController.getClientContest)
route.get('/get/:contest_id', verifyToken, ContestController.getSpecific)
route.get('/winner/:contest_id', verifyToken, ContestController.getWinner)
route.post('/create', verifyToken, ContestController.createContest)
route.put('/edit/:contest_id', verifyToken, ContestController.editContest)
route.put('/publish/:contest_id', verifyToken, ContestController.publishContest)
route.put('/notify/:contest_id', verifyToken, ContestController.pushPaidNotification)
route.put('/payment/:contest_id', verifyToken, ContestController.addPaymentInfo)
route.delete('/delete/:contest_id', verifyToken, ContestController.deleteContest)

module.exports = route