require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Client = require('../models/client')
const Contest = require('../models/contest')

class ClientController {
    static register(req, res) {
        Client.findOne({ email: req.body.email }, (err, user) => {
            if (err) console.log(err)
            else {
                if (!user) {
                    bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
                        let user = new Client({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword,
                        })
                        user.save()
                            .then(() => {
                                res.send({ message: 'new Client Registered Successfully!' })
                            })
                            .catch(err => console.log(err))
                    });
                } else {
                    res.status(400).send({ message: "Email already used!" })
                }
            }
        })
    }
    static createContest(req, res) {
        let contest = new Contest({
            user_id: req.user.id,
            category: req.body.category,
            duration: req.body.duration,
            brief: req.body.brief,
            template: req.body.template
        })
        contest.save()
            .then(() => {
                res.send({ message: 'new Contest Created Successfully' })
            })
            .catch(err => console.log(err))
    }
}

module.exports = ClientController