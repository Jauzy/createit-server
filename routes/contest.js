const route = require('express').Router()
const ContestController = require('../controllers/contest')
const verifyToken = require("../middlewares/verifyToken")

const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Maximum file size is 2MB
    },
});

route.get('/get', verifyToken, ContestController.getAllContest)
route.get('/get/:contest_id', verifyToken, ContestController.getSpecific)
route.post('/create', verifyToken,
    multer.single('image'),
    gcsMiddlewares.sendUploadToGCS, //file field named 'image'
    (req, res, next) => {
        if (req.file && req.file.gcsUrl) {
            req.picture = req.file.gcsUrl;
        }
        next()
    },
    ContestController.createContest)
route.put('/edit/:contest_id', verifyToken, ContestController.editContest)
route.delete('/delete/:contest_id', verifyToken, ContestController.deleteContest)

module.exports = route