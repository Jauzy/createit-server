require('dotenv').config()

const Contest = require('../models/contest')
const Participation = require('../models/participation')
const Creator = require('../models/creator')

class ContestController {
    static createContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            let contest = new Contest({
                user: req.user.id,
                title: req.body.title,
                category: req.body.category,
                sub_category: req.body.sub_category,
                duration: req.body.duration,
                brief: req.body.brief,
                resource_link: req.body.resource_link,
                created: new Date(),
                start_date: null,
                published: false,
                paid_by_client: false,
                bank: null,
                account_no: null,
                entries: 0
            })
            contest.save()
                .then(() => {
                    res.send({ message: 'new Contest Created Successfully' })
                })
                .catch(err => console.log(err))
        }
    }
    static getAllContest(req, res) {
        Contest.find({}).populate('user').then((contests) => {
            if (!contests) res.status(400).send({ message: 'no contest available' })
            res.send({ contests })
        }).catch((err) => res.status(400).send({ err }))
    }
    static getPublished(req, res) {
        Contest.find({ published: true }).populate('user').then((contests) => {
            if (!contests) res.status(400).send({ message: 'no contest available' })
            res.send({ contests })
        }).catch((err) => res.status(400).send({ err }))
    }
    static getSpecific(req, res) {
        Contest.findById(req.params.contest_id).populate('user').then((contest) => {
            if (!contest) res.status(400).send({ message: 'no contest found' })
            res.send({ contest })
        }).catch((err) => res.status(400).send({ err }))
    }
    static getClientContest(req, res) {
        Contest.find({ user: req.user.id }).populate('user').then((contests) => {
            if (!contests) res.status(400).send({ message: 'no contest found' })
            res.send({ contests })
        }).catch((err) => res.status(400).send({ err }))
    }
    static getWinner(req, res) {
        Contest.findById(req.params.contest_id, (err, contest) => {
            if (err) console.log(err)
            else if (!contest) res.status(400).send({ message: 'Contest not found' })
            else {
                let query = {
                    contest: contest._id,
                    selected: true
                }
                Participation.findOne(query).populate('user').then((participation) => {
                    if (!participation) res.status(400).send({ message: 'no winner found' })
                    res.send({ participation })
                }).catch((err) => res.status(400).send({ err }))
            }
        })
    }
    static editContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            Contest.findById(req.params.contest_id, (err, contest) => {
                if (err) console.log(err)
                else if (!contest) res.status(400).send({ message: 'Contest not found' })
                else if (req.user.id != contest.user) res.status(401).send({ message: 'user not authorized' })
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
                else if (req.user.id != contest.user) res.status(401).send({ message: 'user not authorized' })
                else {
                    Participation.findOne({ contest: contest._id }, (err, par) => {
                        if (err) res.status(500).send({ message: 'Delete Participation Failed' })
                        else if (par) res.status(400).send({ message: 'This contest already have participation, cant cancel!' })
                        else {
                            Contest.findByIdAndDelete(req.params.contest_id, (err, result) => {
                                res.send({ message: "Contest Deleted Successfully" })
                            })
                        }
                    })
                }
            })
        }
    }
    static addPaymentInfo(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            Contest.findById(req.params.contest_id, (err, contest) => {
                if (err) console.log(err)
                else if (!contest) res.status(400).send({ message: 'Contest not found' })
                else if (req.user.id != contest.user) res.status(401).send({ message: 'user not authorized' })
                else {
                    let query = {
                        account_no: req.body.account_no,
                        bank: req.body.bank
                    }
                    Contest.findByIdAndUpdate(req.params.contest_id, query, (err, result) => {
                        res.send({ message: "Payment Info Set" })
                    })
                }
            })
        }
    }
    static pushPaidNotification(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            Contest.findById(req.params.contest_id, (err, contest) => {
                if (err) console.log(err)
                else if (!contest) res.status(400).send({ message: 'Contest not found' })
                else if (req.user.id != contest.user) res.status(401).send({ message: 'user not authorized' })
                else if (!contest.bank || !contest.account_no) res.status(400).send({ message: 'please fill in payment info' })
                else {
                    let query = {
                        paid_by_client: true
                    }
                    Contest.findByIdAndUpdate(req.params.contest_id, query, (err, result) => {
                        res.send({ message: "Notification Sent" })
                    })
                }
            })
        }
    }
    static publishContest(req, res) {
        if (req.user.type != 'admin') res.status(400).send({ message: 'invalid type' })
        else {
            Contest.findById(req.params.contest_id, (err, contest) => {
                if (err) console.log(err)
                else if (!contest) res.status(400).send({ message: 'Contest not found' })
                else if (!contest.paid_by_client) res.status(400).send({ message: 'Contest hast been paid' })
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
}

module.exports = ContestController