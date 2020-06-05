require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Admin = require('../models/admin')
const Client = require('../models/client')
const Creator = require('../models/creator')

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
                            const token = jwt.sign({ id: user._id, email: user.email, name: user.name, type: req.body.type }, process.env.SECRETKEY)
                            const { __v, password, ...userData } = user._doc
                            res.send({ message: req.body.type + ' Login successfully', user: userData, token })
                        }
                        else {
                            res.status(400).send({ message: 'Wrong email or password' })
                        }
                    }
                });
            }
        });
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
                console.log(userData)
                const {password, ...user} = userData._doc
                res.send({
                    message: "request success", user
                })
            }
        })
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
}

module.exports = UserController