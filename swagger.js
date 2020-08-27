const token = {
    "in": "header",
    "name": "token",
    "schema": {
        "type": "string"
    },
    "required": true,
    "description": "Token from auth"
}

const users = require('./docs/users')
const contest = require('./docs/contest')
const contestpayment = require('./docs/contest-payment')
const participation = require('./docs/participation')
const project = require('./docs/project')
const projectpayment = require('./docs/project-payment')
const creator = require('./docs/creator')

module.exports = {
    "openapi": "3.0.0",
    "info": {
        "title": "Createit Web",
        "description": "Createit API Documentation"
    },
    "servers": [
        {
            "url": "https://server.createit.id",
            "description": "Production API URL"
        }
    ],
    "paths": {
        ...users, ...contest, ...contestpayment, ...participation, ...project, ...projectpayment, ...creator
    }
}