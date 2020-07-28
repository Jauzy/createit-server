require('dotenv').config()

const Participation = require('../models/participation')
const Contest = require('../models/contest')
const Project = require('../models/project')
const Comment = require('../models/comment')

class ParticipationController {
    static joinContest(req, res) {
        if (req.user.type != 'creator') res.status(400).send({ message: 'only creator can join contest' })
        else {
            Participation.findOne({ user: req.user.id, contest: req.contest._id }).then(result => {
                if (result) res.status(400).send({ message: 'you have already participated in this contest' })
                else {
                    const participation = new Participation({
                        user: req.user.id,
                        contest: req.contest._id,
                        comment: [],
                        rate: []
                    })
                    participation.save().then(() => {
                        res.send({ message: `${req.user.id} successfully join contest ${req.contest._id}` })
                    })
                }
            }).catch(err => console.log(err))
        }
    }
    static async uploadDesign(req, res) {
        const { type, id } = req.params
        if (req.user.type != 'creator') res.status(400).send({ message: 'only creator can join contest' })
        else {
            let query = null
            if (type == 'project') {
                const participation = new Participation({
                    user: req.user.id,
                    project: id,
                    image_url: req.image_url,
                    date_uploaded: new Date(),
                    comment: [],
                    rate: []
                })
                participation.save().then(() => {
                    res.send({ message: 'new participation created' })
                })
            } else if (type == 'contest') {
                await Contest.findById(id).then(contest => {
                    query = { user: req.user.id, contest: contest._id }
                })
                if (query)
                    Participation.findOne(query).then(participation => {
                        if (!participation) res.status(400).send({ message: 'participation not found!' })
                        else {
                            Participation.findByIdAndUpdate(participation._id, { image_url: req.image_url, date_uploaded: new Date() }).then(() => {
                                res.send({ message: 'participation successfully updated!' })
                            }).catch(err => console.log(err))
                        }
                    })
                else res.status(400).send({ message: 'error query' })
            } else res.status({ message: 'invalid type' })
        }
    }
    static updateParticipation(req, res) {
        if (req.user.type != 'creator') res.status(400).send({ message: 'only creator can join contest' })
        else if (req.user.id != req.participation.user._id) res.status(400).send({ message: 'you are not owner of this participation' })
        else {
            const { user, contest, project, image_url, ...approved } = req.body
            Participation.findByIdAndUpdate(req.participation._id, { ...approved }).then(() => {
                res.send({ message: 'participation successfully updated!' })
            }).catch(err => console.log(err))
        }
    }
    static giveRating(req, res) {
        const rate = req.participation.rate
        const index = rate.findIndex(item => item.user == req.user.id)
        if (index != -1) rate[index] = { user: req.user.id, type: req.user.type, rate: req.body.rate }
        else {
            rate.push({ user: req.user.id, type: req.user.type, rate: req.body.rate })
        }
        Participation.findByIdAndUpdate(req.participation._id, { rate }).then(() => {
            res.send({ message: 'you rate this participation!' })
        })
    }
    static comment(req, res) {
        const comment = req.participation.comment
        let newComment = null
        if (req.user.type == 'client') {
            newComment = new Comment({
                user_client: req.user.id,
                text: req.body.text,
                date: new Date(),
                type: req.user.type
            })
            newComment.save().then(saved => {
                comment.unshift(saved._id)
                Participation.findByIdAndUpdate(req.participation._id, { comment }).then(() => {
                    res.send({ message: 'you commented this participation!' })
                })
            })
        } else if (req.user.type == 'creator') {
            newComment = new Comment({
                user_creator: req.user.id,
                text: req.body.text,
                date: new Date(),
                type: req.user.type
            })
            newComment.save().then(saved => {
                comment.unshift(saved._id)
                Participation.findByIdAndUpdate(req.participation._id, { comment }).then(() => {
                    res.send({ message: 'you commented this participation!' })
                })
            })
        } else
            res.status(400).send({ type: 'invalid request' })
    }

    static getParticipations(req, res) {
        Participation.find({}).populate('user contest comment user_client user_creator').sort({ _id: -1 }).then(participations => {
            res.send({ participations })
        }).catch(err => console.log(err))
    }
    static getContestParticipations(req, res) {
        Participation.find({ contest: req.contest._id }).populate('user contest comment').populate({ path: 'comment', populate: { path: 'user_creator', model: 'Creator' } })
            .populate({ path: 'comment', populate: { path: 'user_client', model: 'Client' } }).sort({ _id: -1 }).then(participations => {
                res.send({ participations })
            }).catch(err => console.log(err))
    }
    static getProjectParticipations(req, res) {
        Participation.find({ project: req.project._id }).populate('user project comment').populate({ path: 'comment', populate: { path: 'user_creator', model: 'Creator' } })
            .populate({ path: 'comment', populate: { path: 'user_client', model: 'Client' } }).sort({ _id: -1 }).then(participations => {
                res.send({ participations })
            }).catch(err => console.log(err))
    }
}

module.exports = ParticipationController