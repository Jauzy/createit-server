require('dotenv').config()

const Project = require('../models/project')

class ProjectController {
    static createProject(req, res) {
        const { category, subCategory } = req.body
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else {
            let project = new Project({
                user: req.user.id,
                name: 'Untitled Project',
                category,
                subCategory,
                status: 'Belum Dibayar'
            })
            project.save()
                .then((result) => {
                    res.send({ message: 'new Project Created Successfully', project: result })
                })
                .catch(err => console.log(err))
        }
    }
    static updateBrief(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else if (req.user.id != req.project.user) res.status(400).send({ message: 'not owner of contest!' })
        else {
            Project.findByIdAndUpdate(req.project._id, { ...req.body }).then(result => {
                res.send({ message: `Project successfully updated!` })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static uploadReference(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else if (req.user.id != req.project.user) res.status(400).send({ message: 'not owner of project!' })
        else {
            Project.findByIdAndUpdate(req.project._id, { reference: [...req.project.reference, req.image_url] }).then(result => {
                res.send({ message: `New Reference Added!` })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static deleteReference(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else if (req.user.id != req.project.user) res.status(400).send({ message: 'not owner of project!' })
        else {
            let newReference = req.project.reference
            let index = newReference.findIndex(url => url == req.body.url)
            newReference.splice(index, 1)
            Project.findByIdAndUpdate(req.project._id, { reference: newReference }).then(result => {
                res.send({ message: `Reference deleted!` })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static cancelProject(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else if (req.user.id != req.project.user) res.status(400).send({ message: 'not owner of project!' })
        else {
            Project.findByIdAndUpdate(req.project._id, { status: 'Dibatalkan' }).then(result => {
                res.send({ message: `Project Canceled` })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static getProjects(req, res) {
        Project.find({}).populate('user').then(result => {
            res.send({ projects: result, message: 'Retrive Success!' })
        }).catch(err => res.status(400).send({ message: 'error!' }))
    }
    static getProjectById(req, res) {
        res.send({ project: req.project, message: 'Retrive Success!' })
    }
    static getClientProject(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else {
            Project.find({ user: req.user.id }).populate('user').then(result => {
                res.send({ project: result, message: 'Retrive Success!' })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static getOngoingProject(req, res) {
        Project.find({ status: 'Dalam Pengerjaan' }).then(result => {
            res.send({message:'retrive success!', project: result})
        }).catch(err => res.status(400).send({ message: 'error!' }))
    }
}

module.exports = ProjectController