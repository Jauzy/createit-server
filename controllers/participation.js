require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Participation = require('../models/participation')
const Contest = require('../models/contest')

class ParticipationController {
    static joinContest(req, res) {
        if (req.user.type != 'creator') res.status(400).send({ message: 'only creator can join contest' })
        else {
            Contest.findById(req.params.contest_id, (err, result) => {
                if (!result) res.status(400).send({ message: 'contest not found' })
                if (!result.published) res.status(400).send({ message: 'contest hasnt been published' })
                console.log(req.user)
                const participation = new Participation({
                    user: req.user.id,
                    contest: req.params.contest_id,
                    image_url: req.image_url,
                    selected: false
                })
                participation.save()
                    .then(() => {
                        Contest.findByIdAndUpdate(req.params.contest_id, { entries: result.entries + 1 }, (err, result) => {
                            res.send({ message: 'Join Contest Success!' })
                        })
                    })
                    .catch(err => console.log(err))
            })
        }
    }
    static getAllParticipation(req, res) {
        Participation.find({}).populate('user').populate('contest').then((participation) => {
            if (!participation) res.status(400).send({ message: 'no participation available' })
            res.send({ participation })
        }).catch((err) => res.status(400).send({ err }))
    }
    static getContestParticipation(req, res) {
        Participation.find({ contest: req.params.contest_id }).populate('user').populate('contest').then((participation) => {
            if (!participation) res.status(400).send({ message: 'no participation available' })
            res.send({ participation })
        }).catch((err) => res.status(400).send({ err }))
    }
    static cancelParticipation(req, res) {
        if (req.user.type != 'creator') res.status(400).send({ message: 'invalid type' })
        else {
            Participation.findById(req.params.participation_id, (err, participation) => {
                if (err) console.log(err)
                else if (!participation) res.status(400).send({ message: 'Participation not found' })
                else if (req.user.id != participation.user) res.status(401).send({ message: 'user not authorized' })
                else {
                    Contest.findById(participation.contest, (err, result) => {
                        Contest.findByIdAndUpdate(participation.contest, { entries: result.entries - 1 }, (err, result) => {
                            Participation.findByIdAndDelete(req.params.participation_id, (err, result) => {
                                res.send({ message: "Participation Canceled Successfully" })
                            })
                        })
                    })
                }
            })
        }
    }
    static selectDesign(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            Participation.findById(req.params.participation_id, (err, participation) => {
                if (err) console.log(err)
                else if (!participation) res.status(400).send({ message: 'Participation not found' })
                else {
                    Contest.findById(participation.contest, (err, contest) => {
                        if (err) console.log(err)
                        else if (!contest) res.status(400).send({ message: 'Contest not found' })
                        else if (req.user.id != contest.user) res.status(401).send({ message: 'user not authorized' })
                        else {
                            Participation.findByIdAndUpdate(req.params.participation_id, { selected: true }, (err, result) => {
                                res.send({ message: "Winner Selected Successfully" })
                            })
                        }
                    })
                }
            })
        }
    }
}

module.exports = ParticipationController