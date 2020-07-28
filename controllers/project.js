require('dotenv').config()

const Project = require('../models/project')
const Creator = require('../models/creator')
const Participation = require('../models/participation')

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
    static pushComment(req, res) {
        const { text, user_name, uid } = req.body
        let comment = req.project.comment
        const { projectID } = req.params
        Project.findById(projectID).then(result => {
            let owner = (uid == result.user)
            if (!comment) comment = [{ text, user_name, uid, date: new Date(), owner }]
            else comment.unshift({ text, user_name, uid, date: new Date(), owner })
            Project.findByIdAndUpdate(projectID, { comment }).then(result => {
                res.send({ message: 'comment success' })
            }).catch(err => res.status(400).send({ message: 'error comment!' }))
        }).catch(err => res.status(400).send({ message: 'error project not found!' }))
    }
    static joinProject(req, res) {
        if (req.project.approvedDesigner.includes(req.user.id)) res.status(400).send({ message: 'You already approved in this project!' })
        else if (req.project.designer.includes(req.user.id)) res.status(400).send({ message: 'You have joined this project, please wait for owner approval!' })
        else {
            Project.findByIdAndUpdate(req.project._id, { designer: [...req.project.designer, req.user.id] }).then(() => {
                res.send({ message: 'Join Project Success! Wait For Approval' })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static approveDesigner(req, res) {
        if (req.user.id != req.project.user._id) res.status(401).send({ message: 'not authorized!' })
        else {
            const { userID } = req.params
            Creator.findById(userID).then(user => {
                if (!user) res.status(400).send({ message: 'creator ID not found!' })
                else {
                    Project.findByIdAndUpdate(req.project._id, { approvedDesigner: [...req.project.approvedDesigner, userID] }).then(() => {
                        res.send({ message: 'approved!' })
                    })
                }
            })
        }
    }
    static getProjects(req, res) {
        Project.find({}).populate('user').then(result => {
            res.send({ projects: result, message: 'Retrive Success!' })
        }).catch(err => res.status(400).send({ message: 'error!' }))
    }
    static getProjectById(req, res) {
        Project.findById(req.project._id).populate('designer user approvedDesigner').then(result => {
            Participation.find({ project: req.project._id }).populate('user project comment').populate({path:'comment', populate:{path:'user_creator',model:'Creator'}})
            .populate({path:'comment', populate:{path:'user_client',model:'Client'}}).sort({ _id: -1 }).then((pars) => {
                res.send({ project: result, message: 'Retrive Success!', participations: pars })
            })
        })
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
            res.send({ message: 'retrive success!', project: result })
        }).catch(err => res.status(400).send({ message: 'error!' }))
    }
}

module.exports = ProjectController