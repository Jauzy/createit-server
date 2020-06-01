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
            const participation = new Participation({
                user_id: req.user.id,
                contest_id: req.params.contest_id,
                image_url: req.image_url,
                selected: false
            })
            participation.save()
                .then(() => {
                    res.send({ message: 'Join Contest Success!' })
                })
                .catch(err => console.log(err))
        }
    }
    static getAllParticipation(req, res) {
        Participation.find({}, (err, participation) => {
            if (err) console.log(err)
            else {
                res.send({ participation })
            }
        })
    }
    static getContestParticipation(req, res) {
        Participation.find({ contest_id: req.params.contest_id }, (err, participation) => {
            if (err) console.log(err)
            else if (!participation) res.send({ message: 'No participation found' })
            else {
                res.send({ participation })
            }
        })
    }
    static cancelParticipation(req, res) {
        if (req.user.type != 'creator') res.status(400).send({ message: 'invalid type' })
        else {
            Participation.findById(req.params.participation_id, (err, participation) => {
                if (err) console.log(err)
                else if (!participation) res.status(400).send({ message: 'Participation not found' })
                else if (req.user.id != participation.user_id) res.status(401).send({ message: 'user not authorized' })
                else {
                    Participation.findByIdAndDelete(req.params.participation_id, (err, result) => {
                        res.send({ message: "Participation Deleted Successfully" })
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
                    Contest.findById(participation.contest_id, (err, contest) => {
                        if (err) console.log(err)
                        else if (!contest) res.status(400).send({ message: 'Contest not found' })
                        else if (req.user.id != contest.user_id) res.status(401).send({ message: 'user not authorized' })
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