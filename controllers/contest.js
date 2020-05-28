require('dotenv').config()

const Contest = require('../models/contest')

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
    static createContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'invalid type' })
        else {
            let contest = new Contest({
                user_id: req.user.id,
                category: req.body.category,
                duration: req.body.duration,
                brief: req.body.brief,
                template: req.body.template
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
                    let query = {
                        category: req.body.category,
                        duration: req.body.duration,
                        brief: req.body.brief,
                        template: req.body.template
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
                    Contest.findByIdAndDelete(req.params.contest_id, (err, result) => {
                        res.send({ message: "Contest Deleted Successfully" })
                    })
                }
            })
        }
    }
}

module.exports = ContestController