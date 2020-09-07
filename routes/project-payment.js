const route = require('express').Router()
const PaymentController = require('../controllers/project-payment')
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
route.get('/get/:paymentID', verifyToken, PaymentController.getPaymentByID)
route.put('/update/:paymentID', verifyToken, PaymentController.clientUpdateData)
route.put('/update/:paymentID/proof', verifyToken,
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

route.post('/:projectID', verifyToken, PaymentController.pushPayment)
route.get('/:projectID', verifyToken, PaymentController.getByProjectID)

module.exports = route