const route = require('express').Router()
const verifyToken = require("../middlewares/verifyToken")
const PaymentController = require('../controllers/event-payment')

const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

route.put('/:paymentID/approve', verifyToken, PaymentController.approvePayment)
route.put('/:paymentID/proof', verifyToken,
    multer.single('image'), //file field named 'image'
    gcsMiddlewares.sendUploadToGCS,
    (req, res, next) => {
        if (req.file && req.file.gcsUrl) {
            req.image_url = req.file.gcsUrl
            next()
        } else {
            res.status(500).send('Unable to upload image');
        }
    }, PaymentController.uploadProofOfPayment)
route.put('/:paymentID', verifyToken, PaymentController.updatePayment)
route.delete('/:paymentID', verifyToken, PaymentController.deletePayment)
route.get('/:paymentID', PaymentController.getPaymentByID)
route.post('/event/:eventID', verifyToken, PaymentController.newEventPayment)
route.get('/event/:eventID', PaymentController.getAllPaymentFromEvent)

module.exports = route