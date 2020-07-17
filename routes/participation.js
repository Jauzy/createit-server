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



module.exports = route