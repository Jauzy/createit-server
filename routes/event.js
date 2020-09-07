const route = require('express').Router()
const EventController = require('../controllers/event')
const verifyToken = require("../middlewares/verifyToken")

const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

route.post('/', verifyToken,
    multer.single('image'), //file field named 'image'
    gcsMiddlewares.sendUploadToGCS,
    (req, res, next) => {
        if (req.file && req.file.gcsUrl) {
            req.image_url = req.file.gcsUrl
            next()
        } else {
            res.status(500).send('Unable to upload image');
        }
    },
    EventController.addNewEvent)
route.get('/', EventController.getAllEvents)
route.put('/:eventID', verifyToken, EventController.updateEvent)
route.delete('/:eventID', verifyToken, EventController.deleteEvent)
route.get('/:eventID', EventController.getEventByID)

route.put('/:eventID/image', verifyToken,
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
    EventController.updateEventImage)

module.exports = route