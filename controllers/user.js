require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const User = require('../models/user')
class UserController {
    static register(req, res) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) console.log(err)
            else {
                if (!user) {
                    bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
                        let user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword,
                        })
                        user.save()
                            .then(() => {
                                res.send({ message: 'new User Registered Successfully!' })
                            })
                            .catch(err => console.log(err))
                    });
                } else {
                    res.status(400).send({ message: "Email already used!" })
                }
            }
        })

    }
    static login(req, res) {
        const query = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({ email: query.email }, (err, user) => {
            if (err) console.log(err)
            else {
                bcrypt.compare(query.password, user.password, function (err, result) {
                    if (err) console.log(err)
                    else {
                        if (result) {
                            const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRETKEY)
                            const userData = {
                                name : user.name,
                                email : user.email
                            }
                            res.send({ message: 'user login successfully', user : userData,  token })
                        }
                    }
                });
            }
        });
    }
    static getUserData(req, res) {
        User.findById(req.user.id, (err, userData) => {
            if(err) console.log(err)
            else {
                res.send({message: "request success", user : {
                    name : userData.name,
                    email : userData.email
                }})
            }
        })
        
    }
}

module.exports = UserController