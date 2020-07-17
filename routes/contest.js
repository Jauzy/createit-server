const route = require('express').Router()
const ContestController = require('../controllers/contest')
const verifyToken = require("../middlewares/verifyToken")
const contestMiddlewares = require('../middlewares/contest')

const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Maximum file size is 10MB
    },
});

route.post('/', verifyToken, ContestController.createContest)
route.get('/', ContestController.getContests)

route.get('/ongoing', ContestController.getOngoingContest)

route.get('/user', verifyToken, ContestController.getClientContest)

route.put('/:contestID/reference', verifyToken, contestMiddlewares.findContestById,
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
    ContestController.uploadReference)
route.delete('/:contestID/reference', verifyToken, contestMiddlewares.findContestById, ContestController.deleteReference)

route.put('/:contestID', verifyToken, contestMiddlewares.findContestById, ContestController.updateBrief)
route.get('/:contestID', contestMiddlewares.findContestById, ContestController.getContestById)
route.delete('/:contestID', verifyToken, contestMiddlewares.findContestById, ContestController.cancelContest)

module.exports = route