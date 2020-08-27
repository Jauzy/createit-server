require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Payment = require('../models/project-payment')
const Project = require("../models/project");

class PaymentController {
    static pushPayment(req, res) {
        const { projectID } = req.params
        Project.findById(projectID).then(project => {
            if (!project) res.status(400).send({ message: 'Project not found!' })
            else {
                Payment.findOne({ project: projectID, for: req.user.id }).then((payment) => {
                    if (!payment) {
                        const newPayment = new Payment({
                            for: req.user.id,
                            user: project.user,
                            project: projectID,
                            receiver_bank: req.body.receiver_bank,
                            receiver_account_no: req.body.receiver_account_no,
                            amount: req.body.amount,
                            status: 'Belum Dibayar',
                            created_at: new Date()
                        })
                        newPayment.save().then((payment) => {
                            res.send({ message: 'Payment Successfully Created!', paymentID: payment._id })
                        }).catch(err => res.status(400).send({ message: err }))
                    } else if (payment.status != 'Belum Dibayar') {
                        res.status(400).send({ message: 'you cant update this payment' })
                    } else {
                        Payment.findByIdAndUpdate(payment._id, { ...req.body }).then((payment) => {
                            res.send({ message: 'payment updated!', paymentID: payment._id })
                        }).catch(err => res.status(400).send({ message: 'error updating payment' }))
                    }
                })
            }
        })
    }

    static clientUpdateData(req, res) {
        const { paymentID } = req.params
        Payment.findById(paymentID).then(payment => {
            if (!payment) res.status(400).send({ message: 'Payment not found!' })
            else if (payment.user != req.user.id) res.status(401).send({ message: 'not authorized!' })
            else {
                Payment.findByIdAndUpdate(payment._id, { ...req.body }).then(() => {
                    res.send({ message: 'payment updated!' })
                }).catch(err => res.status(400).send({ message: 'error updating payment' }))
            }
        })
    }

    static uploadProofOfPayment(req, res) {
        const { paymentID } = req.params
        Payment.findById(paymentID).then(payment => {
            if (!payment) res.status(400).send({ message: 'Payment not found!' })
            else if (payment.user != req.user.id) res.status(401).send({ message: 'not authorized!' })
            else {
                Payment.findByIdAndUpdate(payment._id, { proofOfPayment: req.image_url, status: 'Menunggu Konfirmasi' }).then(() => {
                    res.send({ message: 'payment updated!' })
                }).catch(err => res.status(400).send({ message: 'error updating payment' }))
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
                    Payment.findByIdAndUpdate(paymentID, { approved: req.user.id, status: 'Selesai' }).then(() => {
                        res.send({ message: 'payment approved!' })
                    })
                }
            })
        }
    }

    static getByProjectID(req, res) {
        const { projectID } = req.params
        Project.findById(projectID).then(project => {
            if (!project) res.status(400).send({ message: 'Project not found!' })
            else {
                Payment.find({ project: projectID }).populate('for').then((payment) => {
                    res.send({ payment })
                })
            }
        })
    }

    static getPaymentByID(req, res) {
        const { paymentID } = req.params
        Payment.findById(paymentID).populate('for user project').then(payment => {
            if (!payment) res.status(400).send({ message: 'Payment not found!' })
            else {
                res.send({ payment })
            }
        })
    }

    static getUnApprovedPayments(req, res) {
        if (req.user.type !== 'admin') res.status(401).send({ message: 'not authorized!' })
        else
            Payment.find({ approved: null, proofOfPayment: { $ne: null } }).populate('').then(payments => {
                res.send({ payments })
            })
    }

}

module.exports = PaymentController