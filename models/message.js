
const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const MessageSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, ref: 'Creator',
    },
    client: {
        type: Schema.Types.ObjectId, ref: 'Client',
    },
    text: {
        type: String,
        required: [true, 'please provide text']
    },
    room: {
        type: String,
        require: [true]
    },
    time: {
        type: String,
        required: [true, 'please provide date']
    },
    payment: {
        type: Schema.Types.ObjectId, ref: 'ProjectPayment'
    }
})

module.exports = mongoose.model("Message", MessageSchema)