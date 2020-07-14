const route = require('express').Router()
const UserController = require('../controllers/user')
const verifyToken = require("../middlewares/verifyToken")

const Admin = require('../models/admin')
const Client = require('../models/client')
const Creator = require('../models/creator')
const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Maximum file size is 10MB
    },
});

route.put('/update/profile_pict',
    verifyToken,
    (req, res, next) => {
        let Model = null;
        if (req.user.type == 'admin') Model = Admin
        else if (req.user.type == 'creator') Model = Creator
        else if (req.user.type == 'client') Model = Client
        else res.status(400).send({ message: 'invalid type' })
        Model.findById(req.user.id, (err, user) => {
            if (err) console.log(err)
            else if (!user) res.status(400).send({ message: 'User not found' })
            else {
                req.user = req.user
                req.model = Model
                next()
            }
        }).catch(err => console.log(err))
    },
    multer.single('image'), //file field named 'image'
    gcsMiddlewares.sendUploadToGCS,
    (req, res, next) => {
        if (req.file && req.file.gcsUrl) {
            // req.profile_pict = `https://storage.cloud.google.com/file-upload-test-bucket/${req.filename}`
            req.profile_pict = req.file.gcsUrl
            next()
        } else {
            res.status(500).send('Unable to upload');
        }
    },
    UserController.updateProfilePict)

route.post('/login', UserController.login)
route.get('/user', verifyToken, UserController.getUserData)
route.put('/update', verifyToken, UserController.updateUser)
route.put('/update/password', verifyToken, UserController.changePassword)

module.exports = route