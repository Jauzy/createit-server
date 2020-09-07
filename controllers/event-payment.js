require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Creator = require('../models/creator')
const Client = require('../models/client')
const Event = require('../models/event')
const Payment = require('../models/event-payment')

class EventPaymentController {
    static newEventPayment(req, res) {
        const { eventID } = req.params
        Event.findById(eventID).then(event => {
            if (event) {
                if (req.user.type == 'creator') {
                    Creator.findById(req.user.id).then(user => {
                        if (user) {
                            Payment.findOne({ creator: req.user.id, event: eventID }).then(payment => {
                                if (payment) res.status(400).send({ message: 'payment already available' })
                                else {
                                    const { approved, ...approvedBody } = req.body
                                    const payment = new Payment({
                                        creator: req.user.id,
                                        event: eventID,
                                        ...approvedBody
                                    })
                                    payment.save().then(() => {
                                        res.send({ message: 'New Payment Created for Event' })
                                    }).catch(err => res.status(500).send({ err }))
                                }
                            })
                        } else {
                            res.status(400).send({ message: 'user not found!' })
                        }
                    })
                }
                else if (req.user.type == 'client') {
                    Client.findById(req.user.id).then(user => {
                        if (user) {
                            Payment.findOne({ client: req.user.id, event: eventID }).then(payment => {
                                if (payment) res.status(400).send({ message: 'payment already available' })
                                else {
                                    const { approved, ...approvedBody } = req.body
                                    const payment = new Payment({
                                        client: req.user.id,
                                        event: eventID,
                                        ...approvedBody
                                    })
                                    payment.save().then(() => {
                                        res.send({ message: 'New Payment Created for Event' })
                                    }).catch(err => res.status(500).send({ err }))
                                }
                            })
                        } else {
                            res.status(400).send({ message: 'user not found!' })
                        }
                    })
                }
                else {
                    res.status(400).send({ message: 'invalid type' })
                }
            } else {
                res.status(400).send({ message: 'event not found!' })
            }
        }).catch(err => res.status(500).send({ message: 'error' }))
    }
    static updatePayment(req, res) {
        const { paymentID } = req.params
        Payment.findById(paymentID).then(event => {
            if (!event) res.status(400).send({ message: 'payment not found!' })
            else if (req.user.type == 'creator' && event.creator != req.user.id) res.status(401).send({ message: 'not authorized!' })
            else if (req.user.type == 'client' && event.client != req.user.id) res.status(401).send({ message: 'not authorized!' })
            else {
                const { event, creator, client, approved, proofOfPayment, ...approvedBody } = req.body
                Payment.findByIdAndUpdate(paymentID, { ...approvedBody }).then(() => {
                    res.send({ message: 'payment Updated!' })
                }).catch(err => res.status(500).send({ message: 'error' }))
            }
        })
    }
    static uploadProofOfPayment(req, res) {
        const { paymentID } = req.params
        Payment.findById(paymentID).then(payment => {
            if (!payment) res.status(400).send({ message: 'Payment not found!' })
            else if (req.user.type == 'creator' && payment.creator != req.user.id) res.status(401).send({ message: 'not authorized!' })
            else if (req.user.type == 'client' && payment.client != req.user.id) res.status(401).send({ message: 'not authorized!' })
            else {
                Payment.findByIdAndUpdate(payment._id, { proofOfPayment: req.image_url }).then(() => {
                    res.send({ message: 'proof of payment updated!' })
                }).catch(err => res.status(400).send({ message: 'error updating payment' }))
            }
        })
    }
    static approvePayment(req, res) {
        const { paymentID } = req.params
        if (req.user.type !== 'admin') res.status(401).send({ message: 'not authorized!' })
        else {
            Payment.findById(paymentID).then(payment => {
                if (!payment) res.status(400).send({ message: 'Payment not found!' })
                else {
                    Payment.findByIdAndUpdate(payment._id, { approved: req.user.id }).then(() => {
                        res.send({ message: 'payment approved!' })
                    }).catch(err => res.status(400).send({ message: 'error updating payment' }))
                }
            })
        }
    }
    static getUnApprovedPayments(req, res) {
        if (req.user.type !== 'admin') res.status(401).send({ message: 'not authorized!' })
        else
            Payment.find({ approved: null, proofOfPayment: { $ne: null } }).populate('client creator approved event').then(payments => {
                res.send({ payments })
            })
    }
    static getUserPayment(req, res) {
        if (req.user.type == 'client') {
            Payment.find({ client: req.user.id }).populate('client creator approved event').then(result => {
                res.send({ payments: result, message: 'Retrive Success!' })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        } else if (req.user.type == 'creator') {
            Payment.find({ creator: req.user.id }).populate('client creator approved event').then(result => {
                res.send({ payments: result, message: 'Retrive Success!' })
            }).catch(err => res.status(400).send({ message: 'error!' }))
        } else {
            res.status(400).send({ message: 'invalid type' })
        }
    }
    static getAllPaymentFromEvent(req, res) {
        const { eventID } = req.params
        Event.findById(eventID).then(event => {
            if (event) {
                Payment.find({ event: eventID }).populate('client creator approved event').then(events => {
                    res.send({ events })
                })
            }
            else {
                res.status(400).send({ message: 'event not found!' })
            }
        }).catch(err => res.status(500).send({ message: 'error' }))
    }
    static getPaymentByID(req, res) {
        const { paymentID } = req.params
        Payment.findById(paymentID).populate('client creator approved event').then(payment => {
            res.send({ payment })
        }).catch(err => res.status(500).send({ message: 'error' }))
    }
    static deletePayment(req, res) {
        const { paymentID } = req.params
        Payment.findById(paymentID).then(payment => {
            if (!payment) res.send({ message: 'payment not found!' })
            else {
                Payment.findByIdAndDelete(paymentID).then(() => {
                    res.send({ message: 'payment deleted!' })
                })
            }
        }).catch(err => res.status(500).send({ message: 'error' }))
    }
}
module.exports = EventPaymentController