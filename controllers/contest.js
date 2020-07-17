require('dotenv').config()

const Contest = require('../models/contest')
const Participation = require('../models/participation')
const Payment = require('../models/payment')
const Creator = require('../models/creator')

class ContestController {
    static createContest(req, res) {
        const { category, subCategory } = req.body
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else {
            let contest = new Contest({
                user: req.user.id,
                name: 'Untitled Contest',
                category,
                subCategory,
                status: 'Belum Dibayar'
            })
            contest.save()
                .then((result) => {
                    res.send({ message: 'new Contest Created Successfully', contest: result })
                })
                .catch(err => console.log(err))
        }
    }
    static updateBrief(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else if (req.user.id != req.contest.user) res.status(400).send({ message: 'not owner of contest!' })
        else {
            Contest.findByIdAndUpdate(req.contest._id, { ...req.body }).then(result => {
                res.send({ message: `Contest successfully updated!` })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static uploadReference(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else if (req.user.id != req.contest.user) res.status(400).send({ message: 'not owner of contest!' })
        else {
            Contest.findByIdAndUpdate(req.contest._id, { reference: [...req.contest.reference, req.image_url] }).then(result => {
                res.send({ message: `New Reference Added!` })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static deleteReference(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else if (req.user.id != req.contest.user) res.status(400).send({ message: 'not owner of contest!' })
        else {
            let newReference = req.contest.reference
            let index = newReference.findIndex(url => url == req.body.url)
            newReference.splice(index, 1)
            Contest.findByIdAndUpdate(req.contest._id, { reference: newReference }).then(result => {
                res.send({ message: `Reference deleted!` })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static cancelContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else if (req.user.id != req.contest.user) res.status(400).send({ message: 'not owner of contest!' })
        else {
            Contest.findByIdAndUpdate(req.contest._id, { status: 'Dibatalkan' }).then(result => {
                res.send({ message: `Contest Canceled` })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static getContests(req, res) {
        Contest.find({}).populate('user').then(result => {
            res.send({ contests: result, message: 'Retrive Success!' })
        }).catch(err => res.status(400).send({ message: 'error!' }))
    }
    static getContestById(req, res) {
        res.send({ contest: req.contest, message: 'Retrive Success!' })
    }
    static getClientContest(req, res) {
        if (req.user.type != 'client') res.status(400).send({ message: 'not authorized!' })
        else {
            Contest.find({ user: req.user.id }).populate('user').then(result => {
                res.send({ contests: result, message: 'Retrive Success!' })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        }
    }
    static getOngoingContest(req, res) {
        Contest.find({ status: 'Dalam Pengerjaan' }).then(result => {
            res.send({message:'retrive success!', contests: result})
        }).catch(err => res.status(400).send({ message: 'error!' }))
    }
}

module.exports = ContestController