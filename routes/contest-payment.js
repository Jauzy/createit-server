const route = require('express').Router()
const PaymentController = require('../controllers/contest-payment')
const verifyToken = require("../middlewares/verifyToken")

const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Maximum file size is 10MB
    },
});

route.get('/unapproved', verifyToken, PaymentController.getUnApprovedPayments)
route.put('/approve/:paymentID', verifyToken, PaymentController.approvePayment)

route.post('/:contestID', verifyToken, PaymentController.pushPayment)
route.get('/:contestID', verifyToken, PaymentController.getByContestID)
route.put('/:contestID/proof', verifyToken,
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
    PaymentController.uploadProofOfPayment)

module.exports = route