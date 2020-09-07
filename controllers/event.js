require('dotenv').config()

const Creator = require('../models/creator')
const Client = require('../models/client')
const Event = require('../models/event')
const Payment = require('../models/event-payment')

class EventController {
    static addNewEvent(req, res) {
        if (req.user.type !== 'admin') res.status(401).send({ message: 'not authorized!' })
        else {
            let event = new Event({
                createdBy: req.user.id,
                created_date: new Date(),
                image_url: req.image_url,
                ...req.body,
            })
            event.save()
                .then(() => {
                    res.send({ message: 'new Event Created Successfully!' })
                })
                .catch(err => console.log(err))
        }
    }
    static updateEventImage(req, res) {
        const { eventID } = req.params
        if (req.user.type !== 'admin') res.status(401).send({ message: 'not authorized!' })
        else {
            Event.findById(eventID).then(event => {
                if (!event) res.status(400).send({ message: 'event not found!' })
                else if (event.createdBy != req.user.id) res.status(401).send({ message: 'not authorized!' })
                else {
                    Event.findByIdAndUpdate(eventID, { image_url: req.image_url }).then(() => {
                        res.send({ message: "event image updated!" })
                    }).catch(err => res.status(500).send({ message: 'error occured!' }))
                }
            })
        }
    }
    static updateEvent(req, res) {
        const { eventID } = req.params
        if (req.user.type !== 'admin') res.status(401).send({ message: 'not authorized!' })
        else {
            Event.findById(eventID).then(event => {
                if (!event) res.status(400).send({ message: 'event not found!' })
                else if (event.createdBy != req.user.id) res.status(401).send({ message: 'not authorized!' })
                else {
                    const { createdBy, image_url, ...approved } = req.body
                    Event.findByIdAndUpdate(eventID, { ...approved }).then(() => {
                        res.send({ message: "event updated!" })
                    }).catch(err => res.status(500).send({ message: 'error occured!' }))
                }
            })
        }
    }
    static deleteEvent(req, res) {
        const { eventID } = req.params
        if (req.user.type != 'admin') res.status(401).send({ message: 'not authorized!' })
        else {
            Event.findById(eventID).then(event => {
                if (!event) res.status(400).send({ message: 'event not found!' })
                else if (event.createdBy != req.user.id) res.status(401).send({ message: 'not authorized!' })
                else {
                    Payment.findOne({ event: eventID }).then(payment => {
                        if (payment) res.status(400).send({ message: 'event already have a payment!' })
                        else {
                            Event.findByIdAndDelete(eventID).then(() => {
                                res.send({ message: "event deleted!" })
                            }).catch(err => res.status(500).send({ message: 'error occured!' }))
                        }
                    }).catch(err => res.status(500).send({ message: 'error' }))
                }
            }).catch(err => res.status(500).send({ message: 'error' }))
        }
    }
    static getAllEvents(req, res) {
        Event.find({}).populate('createdBy').then(events => {
            res.send({ events })
        }).catch(err => res.status(500).send({ message: 'error occured!' }))
    }
    static getEventByID(req, res) {
        const { eventID } = req.params
        Event.findById(eventID).populate('createdBy').then(event => {
            if (!event) res.status(400).send({ message: 'event not found!' })
            else
                res.send({ event })
        }).catch(err => res.status(500).send({ message: 'error occured!' }))
    }
}

module.exports = EventController