const Contest = require('../models/contest')

exports.findContestById = function (req, res, next) {
    const { contestID } = req.params
    Contest.findById(contestID).then(result => {
        if (result) {
            req.contest = result
            next()
        } else {
            res.status(400).send({ message: 'Contest not Found!!' })
        }
    }).catch(err => res.status(400).send({ message: 'search contest error!' }))
}