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
}

module.exports = ParticipationController