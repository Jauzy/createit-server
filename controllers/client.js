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
}

module.exports = ClientController