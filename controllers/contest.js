require('dotenv').config()

const Contest = require('../models/contest')
const Participation = require('../models/participation')
const Creator = require('../models/creator')

class ContestController {
    static getAllContest(req, res) {
        Contest.find({}, (err, contests) => {
            if (err) console.log(err)
            else {
                res.send({ contests })
            }
        })
    }
    static getSpecific(req, res) {
        Contest.findById(req.params.contest_id, (err, contest) => {
            if (err) console.log(err)
            else if (!contest) res.status(400).send({ message: 'Contest not found' })
            else {
                res.send({ contest })
            }
        })
    }
    static getClientContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            Contest.find({ user_id: req.user.id }, (err, contest) => {
                if (err) console.log(err)
                else if (!contest) res.status(400).send({ message: 'Contest not found' })
                else {
                    res.send({ contest })
                }
            })
        }
    }
    static createContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            let contest = new Contest({
                user_id: req.user.id,
                title: req.body.title,
                category: req.body.category,
                sub_category: req.body.sub_category,
                duration: req.body.duration,
                brief: req.body.brief,
                resource_link: req.body.resource_link,
                created: new Date(),
                start_date: null,
                published: false
            })
            contest.save()
                .then(() => {
                    res.send({ message: 'new Contest Created Successfully' })
                })
                .catch(err => console.log(err))
        }
    }
    static editContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            Contest.findById(req.params.contest_id, (err, contest) => {
                if (err) console.log(err)
                else if (!contest) res.status(400).send({ message: 'Contest not found' })
                else if (req.user.id != contest.user_id) res.status(401).send({ message: 'user not authorized' })
                else {
                    console.log(contest)
                    let query = {
                        title: req.body.title ? req.body.title : contest.title,
                        category: req.body.category ? req.body.category : contest.category,
                        sub_category: req.body.sub_category ? req.body.sub_category : contest.sub_category,
                        duration: req.body.duration ? req.body.duration : contest.duration,
                        brief: req.body.brief ? req.body.brief : contest.brief,
                        resource_link: req.body.resource_link ? req.body.resource_link : contest.resource_link,
                    }
                    Contest.findByIdAndUpdate(req.params.contest_id, query, (err, result) => {
                        res.send({ message: "Contest Updated Successfully" })
                    })
                }
            })
        }
    }
    static deleteContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            Contest.findById(req.params.contest_id, (err, contest) => {
                if (err) console.log(err)
                else if (!contest) res.status(400).send({ message: 'Contest not found' })
                else if (req.user.id != contest.user_id) res.status(401).send({ message: 'user not authorized' })
                else {
                    Participation.deleteMany({ contest_id: contest._id }, (err) => {
                        if (err) res.status(500).send({ message: 'Delete Participation Failed' })
                    })
                    Contest.findByIdAndDelete(req.params.contest_id, (err, result) => {
                        res.send({ message: "Contest Deleted Successfully" })
                    })
                }
            })
        }
    }
    static publishContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            Contest.findById(req.params.contest_id, (err, contest) => {
                if (err) console.log(err)
                else if (!contest) res.status(400).send({ message: 'Contest not found' })
                else if (req.user.id != contest.user_id) res.status(401).send({ message: 'user not authorized' })
                else {
                    let query = {
                        start_date: new Date(),
                        published: true
                    }
                    Contest.findByIdAndUpdate(req.params.contest_id, query, (err, result) => {
                        res.send({ message: "Contest Published Successfully" })
                    })
                }
            })
        }
    }
    static getWinner(req, res) {
        Contest.findById(req.params.contest_id, (err, contest) => {
            if (err) console.log(err)
            else if (!contest) res.status(400).send({ message: 'Contest not found' })
            else {
                let query = {
                    contest_id: contest._id,
                    selected: true
                }
                Participation.findOne(query, (err, participation) => {
                    Creator.findById(participation.user_id, (err, user) => {
                        const { password, email, ...creator } = user
                        res.send({ participation, creator: creator._doc })
                    })
                })
            }
        })
    }
}

module.exports = ContestController