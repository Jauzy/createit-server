const route = require('express').Router()
const ParticipationController = require('../controllers/participation')
const verifyToken = require("../middlewares/verifyToken")
const participationMiddlewares = require('../middlewares/participation')
const contestMiddlewares = require('../middlewares/contest')
const projectMiddlewares = require('../middlewares/project')

const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Maximum file size is 10MB
    },
});

route.get('/', ParticipationController.getParticipations)
route.get('/project/:projectID', projectMiddlewares.findProjectById, ParticipationController.getProjectParticipations)
route.get('/contest/:contestID', contestMiddlewares.findContestById, ParticipationController.getContestParticipations)
route.post('/contest/:contestID', contestMiddlewares.findContestById, verifyToken, ParticipationController.joinContest)
route.put('/image/:type/:id', verifyToken,
    multer.single('image'), //file field named 'image'
    gcsMiddlewares.sendUploadToGCS,
    (req, res, next) => {
        if (req.file && req.file.gcsUrl) {
            req.image_url = req.file.gcsUrl
            next()
        } else {
            res.status(500).send('Unable to upload');
        }
    },
    ParticipationController.uploadDesign)

route.put('/:participationID/update', verifyToken, participationMiddlewares.findParticipationById, ParticipationController.updateParticipation)
route.put('/:participationID/rate', verifyToken, participationMiddlewares.findParticipationById, ParticipationController.giveRating)
route.put('/:participationID/comment', verifyToken, participationMiddlewares.findParticipationById, ParticipationController.comment)

module.exports = route