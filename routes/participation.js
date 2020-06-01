const route = require('express').Router()
const ParticipationController = require('../controllers/participation')
const verifyToken = require("../middlewares/verifyToken")

const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Maximum file size is 10MB
    },
});

route.get('/get', verifyToken, ParticipationController.getAllParticipation )
route.get('/get/:contest_id', verifyToken, ParticipationController.getContestParticipation )
route.post('/join/:contest_id',
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
    verifyToken,
    ParticipationController.joinContest)
route.delete('/cancel/:participation_id', verifyToken, ParticipationController.cancelParticipation)
route.put('/select/:participation_id', verifyToken, ParticipationController.selectDesign)

module.exports = route