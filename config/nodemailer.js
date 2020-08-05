require('dotenv').config()
const nodemailer = require('nodemailer');
var sendinBlue = require('nodemailer-sendinblue-transport');

const transporter = nodemailer.createTransport(sendinBlue({
    apiKey:process.env.PASSWORD,
}))

module.exports = transporter;
