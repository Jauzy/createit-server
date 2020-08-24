const route = require('express').Router()
const CreatorController = require('../controllers/creator')
const verifyToken = require("../middlewares/verifyToken")

route.post('/register', CreatorController.register)
route.get('/', CreatorController.getCreators)
route.get('/contests', verifyToken, CreatorController.getCreatorContestParticipation)
route.get('/projects', verifyToken, CreatorController.getCreatorProjectParticipation)

module.exports = route