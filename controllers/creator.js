require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Creator = require('../models/creator')
class CreatorController {
    static register(req, res) {
        Creator.findOne({ email: req.body.email }, (err, user) => {
            if (err) console.log(err)
            else {
                if (!user) {
                    bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
                        let user = new Creator({
                            name: req.body.name,
                            email: req.body.email,
                            category: req.body.category,
                            phone_no: req.body.phone_no,
                            instagram_username: req.body.instagram_username,
                            studio_name: req.body.studio_name,
                            studio_instagram_username: req.body.studio_instagram_username,
                            bio: req.body.bio,
                            expertise: req.body.expertise,
                            portofolio_link: req.body.portofolio_link,
                            password: hashedPassword,
                        })
                        user.save()
                            .then(() => {
                                res.send({ message: 'new Creator Registered Successfully!' })
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

module.exports = CreatorController