require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Admin = require('../models/admin')
class AdminController {
    static register(req, res) {
        Admin.findOne({ email: req.body.email }, (err, user) => {
            if (err) console.log(err)
            else {
                if (!user) {
                    bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
                        let user = new Admin({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword,
                        })
                        user.save()
                            .then(() => {
                                res.send({ message: 'new Admin Registered Successfully!' })
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
        Admin.findOne({ email: query.email }, (err, user) => {
            if (err) console.log(err)
            else if(!user) res.status(400).send({message : 'Wrong email or password'})
            else {
                bcrypt.compare(query.password, user.password, function (err, result) {
                    if (err) console.log(err)
                    else {
                        if (result) {
                            const token = jwt.sign({ id: user._id, email: user.email, type: 'admin' }, process.env.SECRETKEY)
                            const userData = {
                                name : user.name,
                                email : user.email
                            }
                            res.send({ message: 'Admin login successfully', user : userData,  token })
                        }
                        else {
                            res.status(400).send({message : 'Wrong email or password'})
                        }
                    }
                });
            }
        });
    }
}

module.exports = AdminController