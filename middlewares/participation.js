const Participation = require('../models/participation')

exports.findParticipationById = function (req, res, next) {
    const { participationID } = req.params
    Participation.findById(participationID).then(result => {
        if (result) {
            req.participation = result
            next()
        } else {
            res.status(400).send({ message: 'Participation not Found!!' })
        }
    }).catch(err => res.status(400).send({ message: 'search participation error!' }))
}