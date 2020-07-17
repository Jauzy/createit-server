require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Payment = require('../models/payment')
class PaymentController {
    static createNewPayment(req, res) {
        
    }
}

module.exports = PaymentController