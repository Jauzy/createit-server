require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const emailTemplate = require('../utils/emailTemplate')
const nodemailer = require('nodemailer');
// const frontEndServer = 'http://localhost:3000'
const frontEndServer = 'https://createit.id'

const Admin = require('../models/admin')
const Client = require('../models/client')
const Creator = require('../models/creator')
const Participation = require('../models/participation')

class UserController {
    static login(req, res) {
        let Model = null;
        if (req.body.type == 'admin') Model = Admin
        else if (req.body.type == 'creator') Model = Creator
        else if (req.body.type == 'client') Model = Client
        else res.status(400).send({ message: 'invalid type' })
        const query = {
            email: req.body.email,
            password: req.body.password,
        }
        Model.findOne({ email: query.email }, (err, user) => {
            if (err) console.log(err)
            else if (!user) res.status(400).send({ message: 'Wrong email or password' })
            else {
                bcrypt.compare(query.password, user.password, function (err, result) {
                    if (err) console.log(err)
                    else {
                        if (result) {
                            const token = jwt.sign({ id: user._id, email: user.email, name: user.name, type: req.body.type, profile_pict: user.profile_pict }, process.env.SECRETKEY)
                            const { __v, password, ...userData } = user._doc
                            res.send({ message: req.body.type + ' Login successfully', user: { ...userData, type: req.body.type }, token })
                        }
                        else {
                            res.status(400).send({ message: 'Wrong email or password' })
                        }
                    }
                });
            }
        });
    }
    static updateProfilePict(req, res) {
        req.model.findByIdAndUpdate(req.user.id, { profile_pict: req.profile_pict }, (err, user) => {
            res.send({ message: 'profile pict updated!', profile_pict: req.profile_pict })
        }).catch(err => console.log(err))
    }
    static updateUser(req, res) {
        let Model = null;
        if (req.user.type == 'admin') Model = Admin
        else if (req.user.type == 'creator') Model = Creator
        else if (req.user.type == 'client') Model = Client
        else res.status(400).send({ message: 'invalid type' })
        const { email, password, ...approved } = req.body;
        Model.findByIdAndUpdate(req.user.id, approved, (err, user) => {
            if (err) console.log(err)
            else if (!user) res.status(400).send({ message: 'User not found' })
            else {
                res.send({ message: "User Data Updated Successfully" })
            }
        })
    }
    static changePassword(req, res) {
        let Model = null;
        if (req.user.type == 'admin') Model = Admin
        else if (req.user.type == 'creator') Model = Creator
        else if (req.user.type == 'client') Model = Client
        else res.status(400).send({ message: 'invalid type' })
        Model.findById(req.user.id, (err, user) => {
            if (err) console.log(err)
            else if (!user) res.status(400).send({ message: 'User not found' })
            else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (err) console.log(err)
                    else {
                        if (result) {
                            bcrypt.hash(req.body.newPassword, saltRounds, function (err, hashedPassword) {
                                Model.findByIdAndUpdate(req.user.id, { password: hashedPassword }, (err, result) => {
                                    res.send({ message: "Password Updated Successfully" })
                                })
                            });
                        }
                        else {
                            res.status(400).send({ message: 'Wrong password' })
                        }
                    }
                });
            }
        })
    }
    static getUserData(req, res) {
        let Model = null;
        if (req.user.type == 'admin') Model = Admin
        else if (req.user.type == 'creator') Model = Creator
        else if (req.user.type == 'client') Model = Client
        else res.status(400).send({ message: 'invalid token' })
        Model.findById(req.user.id, (err, userData) => {
            if (err) console.log(err)
            else if (!userData) res.status(400).send({ message: "Invalid Token" })
            else {
                const { password, ...user } = userData._doc
                res.send({
                    message: "request success", user: { ...user, type: req.user.type }
                })
            }
        })
    }
    static getPublicProfile(req, res) {
        const { creatorID } = req.params
        Creator.findById(creatorID).then(user => {
            if (!user) res.status(400).send({ message: 'creator not found!' })
            else {
                Participation.find({ user: creatorID }).populate('user contest project comment').populate({ path: 'comment', populate: { path: 'user_creator', model: 'Creator' } })
                    .populate({ path: 'comment', populate: { path: 'user_client', model: 'Client' } }).sort({ _id: -1 }).then(participations => {
                        res.send({ user, participations: participations })
                    })
            }
        })
    }



    static verifyEmail(req, res) {
        const { token } = req.params
        jwt.verify(token, process.env.SECRETKEY, function (err, decoded) {
            if (err) console.log(err)
            else {
                const user = {
                    email: decoded.email,
                    id: decoded.id,
                    type: decoded.type
                }
                let Model = null;
                if (user.type == 'admin') Model = Admin
                else if (user.type == 'creator') Model = Creator
                else if (user.type == 'client') Model = Client
                else res.status(400).send({ message: 'invalid token' })
                Model.findById(user.id).then(result => {
                    if (!result) res.status(400).send({ message: 'user not found!' })
                    else if (result.verified) res.status(400).send({ message: 'user verified!' })
                    else {
                        Model.findByIdAndUpdate(user.id, { verified: true }).then(() => {
                            res.send({ message: 'Account Verified!' })
                        })
                    }
                })
            }
        });
    }

    static sendVerificationEmail(req, res) {
        let Model = null;
        if (req.user.type == 'admin') Model = Admin
        else if (req.user.type == 'creator') Model = Creator
        else if (req.user.type == 'client') Model = Client
        else res.status(400).send({ message: 'invalid token' })
        Model.findById(req.user.id).then(user => {
            if (!user) res.status(400).send({ message: 'User not found!' })
            else {
                const token = jwt.sign({ id: user._id, email: user.email, type: req.user.type }, process.env.SECRETKEY)

                const transporter = nodemailer.createTransport({
                    service: 'gmail',//smtp.gmail.com  //in place of service use host...
                    secure: false,//true
                    port: 25,//465
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }, tls: {
                        rejectUnauthorized: false
                    }
                });

                var mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Email Verification for Createit Web',
                    html: emailTemplate('Verify Account', 'Verify your email for an account in createit website.', 'Verify Now',
                        `${frontEndServer}/email?verify=${token}&&email=${user.email}`, user)
                }

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(400).send({ error })
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send({ message: 'verification mail sent!' })
                    }
                });
            }
        })
    }

    static resetPassword(req, res) {
        const { token } = req.params
        const { newPassword } = req.body
        jwt.verify(token, process.env.SECRETKEY, function (err, decoded) {
            if (err) console.log(err)
            else {
                const user = {
                    email: decoded.email,
                    id: decoded.id,
                    type: decoded.type
                }
                let Model = null;
                if (user.type == 'admin') Model = Admin
                else if (user.type == 'creator') Model = Creator
                else if (user.type == 'client') Model = Client
                else res.status(400).send({ message: 'invalid token' })
                Model.findById(user.id).then(result => {
                    if (!result) res.status(400).send({ message: 'user not found!' })
                    else {
                        bcrypt.hash(newPassword, saltRounds, function (err, hashedPassword) {
                            Model.findByIdAndUpdate(user.id, { password: hashedPassword }).then(() => {
                                res.send({ message: 'Account Password Reset Success!' })
                            })
                        })
                    }
                })
            }
        });
    }

    static sendResetPasswordEmail(req, res) {
        const { email, type } = req.params
        let Model = null;
        if (type == 'admin') Model = Admin
        else if (type == 'creator') Model = Creator
        else if (type == 'client') Model = Client
        else res.status(400).send({ message: 'invalid token' })
        Model.findOne({ email }).then(user => {
            if (!user) res.status(400).send({ message: 'User not found!' })
            else {
                console.log(user)
                console.log(process.env.EMAIL, process.env.PASSWORD)
                const token = jwt.sign({ id: user._id, email: user.email, type }, process.env.SECRETKEY)
                
                const transporter = nodemailer.createTransport({
                    service: 'gmail',//smtp.gmail.com  //in place of service use host...
                    secure: false,//true
                    port: 25,//465
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }, tls: {
                        rejectUnauthorized: false
                    }
                });

                var mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Reset Password for Createit Web',
                    html: emailTemplate('Reset Password', 'Reset your password for an account in createit website.', 'Reset Now',
                        `${frontEndServer}/forgot-password?verify=${token}&&email=${user.email}`, user)
                }

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(400).send({ error })
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send({ message: 'reset password mail sent!' })
                    }
                });
            }
        })
    }

}

module.exports = UserController