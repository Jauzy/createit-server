require('dotenv').config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 8001

//mongoose
const mongoose = require('mongoose')

//db URL
const mongodbUri = process.env.MONGOURI

//setting up DB params (mongodbUri, optional) (wajib)
// useNewURLParser buat ignore warning (wajib)
mongoose
    .connect(mongodbUri, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDb connected on', mongodbUri)
    })
    .catch(err => {
        console.log(err)
    })

//cors
app.use(require('cors')())

//body-parser express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routers in index.js
const router = require('./routes/index')
app.use('/', router)

//swagger
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//ssl
app.use(express.static(__dirname + '/static', { dotfiles: 'allow' }))

const fs = require('fs')
const https = require('https')
const http = require('http')

//change to 80 for production
http.createServer(app).listen(80, () => {
    console.log('Listening...')
})

const server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/server.createit.id/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/server.createit.id/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/server.createit.id/fullchain.pem')
}, app).listen(443, () => {
    console.log('Listening...')
})

const Message = require('./models/message')
const Creator = require('./models/creator')
const Client = require('./models/client')

const socketIo = require("socket.io");
const moment = require('moment')
const io = socketIo(server);
const formatMessages = (user, text) => ({ user, text, time: moment().format('h:mm a') })
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users-chat')

io.on('connection', socket => {
    //three types of emits
    //single client emit : socket.emit()
    //multi client except the one who connect : socket.broadcast.emit()
    //multi client including the one who connect : io.emit()
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)
        //socket io room
        if (!getCurrentUser(socket._id))
            socket.join(user.room)
        Message.find({ room }).limit(20).populate('user').then((messages) => {
            socket.emit('recoverMessage', messages)
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
            //welcome current user
            // socket.emit('message', formatMessages({ nickname: botName }, 'Welcome to Jojinime!'))
        })
    })

    //listen for chat message
    socket.on('chatMessage', (user, msg, room) => {
        User.findById(user._id).then(user => {
            if (user) {
                const newMsg = new Message({
                    user: user._id,
                    text: msg,
                    room,
                    time: moment().format('h:mm a')
                })
                newMsg.save().then(() => {
                    io.to(room).emit('message', formatMessages({ nickname: user.nickname }, msg))
                })
            }
        })
    })

    //runs when client disconnect
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if (user) {

        }
    })
})