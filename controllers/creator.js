require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Creator = require('../models/creator')
const Participation = require('../models/participation')
const Project = require('../models/project')

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
    
    static getCreators(req, res){
        Creator.find().select('-password').then(async creators => {
            let newCreators = []
            const promiseCreators = creators.map(function (creator) {
                return new Promise(function (resolve, reject) {
                    Participation.find({user:creator._id}).populate('').then(pars => {
                        return resolve({
                            creator,
                            participationsCount: pars? pars.length : 0,
                            participations: pars,
                        })
                    }).catch(err => {
                        return reject(err)
                    })
                });
            });
            Promise.all(promiseCreators).then(function(creators) {
                res.send({creators})
            })
        }).catch(err => console.log(err))
    }

    static getCreatorContestParticipation(req, res){
        Creator.findById(req.user.id).then(user => {
            if(!user) res.status(400).send({message:'no user found, invalid credentials'})
            else {
                Participation.find({user:req.user.id, contest:{$ne: null}}).populate('contest').then(result => {
                    res.send({contest: result})
                })
            }
        })
    }

    static getCreatorProjectParticipation(req, res){
        Creator.findById(req.user.id).then(user => {
            if(!user) res.status(400).send({message:'no user found, invalid credentials'})
            else {
                console.log(req.user.id)
                Project.find({approvedDesigner: {$in : req.user.id}}).then(result => {
                    res.send({project: result})
                })
            }
        })
    }

}

module.exports = CreatorController