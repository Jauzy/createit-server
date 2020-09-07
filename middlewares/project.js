const Project = require('../models/project')

exports.findProjectById = function (req, res, next) {
    const { projectID } = req.params
    Project.findById(projectID).then(result => {
        if (result) {
            req.project = result
            next()
        } else {
            res.status(400).send({ message: 'Project not Found!!' })
        }
    }).catch(err => res.status(400).send({ message: 'search project error!' }))
}