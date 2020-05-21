const route = require('express').Router()
const UserController = require('../controllers/user')
const verifyToken = require("../middlewares/verifyToken")

/**
 *  @swagger
 *      /register:
 *      post:
 *          description: Use to register new user
 *          parameters : 
 *          -   name: name
 *              in: body
 *              schema: {
 *                  
 *              }
 *              description: User Name
 *              required: true
 * 
 *          responses:
 *              '200':
 *                  description: User successfully registered
 */

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/user', verifyToken, UserController.getUserData)

module.exports = route