require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Payment = require('../models/contest-payment')
const Contest = require("../models/contest");

class PaymentController {
    static pushPayment(req, res) {
        const { contestID } = req.params
        Contest.findById(contestID).then(contest => {
            if (!contest) res.status(400).send({ message: 'Contest not found!' })
            else if (req.user.id != contest.user) res.status(401).send({ message: 'Not Authorized!' })
            else {
                Payment.findOne({ contest: contestID }).then((payment) => {
                    if (!payment) {
                        const newPayment = new Payment({
                            user: req.user.id,
                            contest: contestID,
                            bank: req.body.bank,
                            account_no: req.body.account_no,
                            amount: req.body.amount,
                        })
                        newPayment.save().then(() => {
                            res.send({ message: 'Payment Successfully Created!' })
                        }).catch(err => res.status(400).send({ message: 'error creating new payment' }))
                    } else {
                        Payment.findByIdAndUpdate(payment._id, { ...req.body }).then(() => {
                            res.send({ message: 'payment updated!' })
                        }).catch(err => res.status(400).send({ message: 'error updating payment' }))
                    }
                })
            }
        })
    }

    static uploadProofOfPayment(req, res) {
        const { contestID } = req.params
        Contest.findById(contestID).then(contest => {
            if (!contest) res.status(400).send({ message: 'Contest not found!' })
            else if (req.user.id != contest.user) res.status(401).send({ message: 'Not Authorized!' })
            else {
                Payment.findOne({ contest: contestID }).then((payment) => {
                    if (!payment) res.status(400).send({ message: 'payment not found!' })
                    else {
                        Payment.findByIdAndUpdate(payment._id, { proofOfPayment: req.image_url }).then(() => {
                            res.send({ message: 'payment updated!' })
                        }).catch(err => res.status(400).send({ message: 'error updating payment' }))
                    }
                })
            }
        })
    }

    static approvePayment(req, res) {
        const { paymentID } = req.params
        if (req.user.type !== 'admin') res.status(401).send({ message: 'not authorized!' })
        else {
            Payment.findById(paymentID).then(payment => {
                if (!payment) res.status(400).send({ message: 'payment not found!' })
                else {
                    Payment.findByIdAndUpdate(paymentID, { approved: req.user.id }).then(() => {
                        Contest.findByIdAndUpdate(payment.contest, { status: 'Dalam Pengerjaan', startDate: new Date()}).then(() => {
                            res.send({ message: 'payment approved!' })
                        })
                    })
                }
            })
        }
    }

    static getByContestID(req, res) {
        const { contestID } = req.params
        Contest.findById(contestID).then(contest => {
            if (!contest) res.status(400).send({ message: 'Contest not found!' })
            else {
                Payment.findOne({ contest: contestID }).then((payment) => {
                    res.send({ payment })
                })
            }
        })
    }

    static getUnApprovedPayments(req, res) {
        if (req.user.type !== 'admin') res.status(401).send({ message: 'not authorized!' })
        else
            Payment.find({ approved: null, proofOfPayment: { $ne: null } }).then(payments => {
                res.send({ payments })
            })
    }

}

module.exports = PaymentController