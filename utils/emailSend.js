require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const mailjet = require('node-mailjet')
    .connect(process.env.APIMAILJET, process.env.APIMAILJET2)
const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
        "Messages": [
            {
                "From": {
                    "Email": "al.zaujy@gmail.com",
                    "Name": "Muhammad Abdurrahman Al Jauzy"
                },
                "To": [
                    {
                        "Email": "legendofnuke@gmail.com",
                        "Name": "Nani Koreee"
                    }
                ],
                "Subject": "Greetings from Mailjet.",
                "TextPart": "My first Mailjet email",
                "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                "CustomID": "AppGettingStartedTest"
            }
        ]
    })
request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })