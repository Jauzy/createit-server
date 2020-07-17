const route = require('express').Router()
const ProjectController = require('../controllers/project')
const verifyToken = require("../middlewares/verifyToken")
const projectMiddlewares = require('../middlewares/project')

const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Maximum file size is 10MB
    },
});

route.post('/', verifyToken, ProjectController.createProject)
route.get('/', ProjectController.getProjects)

route.get('/ongoing', ProjectController.getOngoingProject)

route.get('/user', verifyToken, ProjectController.getClientProject)

route.put('/:projectID/reference', verifyToken, projectMiddlewares.findProjectById,
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
    ProjectController.uploadReference)
route.delete('/:projectID/reference', verifyToken, projectMiddlewares.findProjectById, ProjectController.deleteReference)

route.put('/:projectID', verifyToken, projectMiddlewares.findProjectById, ProjectController.updateBrief)
route.get('/:projectID', projectMiddlewares.findProjectById, ProjectController.getProjectById)
route.delete('/:projectID', verifyToken, projectMiddlewares.findProjectById, ProjectController.cancelProject)

module.exports = route