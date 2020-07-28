const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const CommentSchema = new Schema({
    user_client: {
        type: Schema.Types.ObjectId, ref: 'Client',
    },
    user_creator: {
        type: Schema.Types.ObjectId, ref: 'Creator',
    },
    type: {
        type: String,
        required: [true]
    },
    text: {
        type: String,
        required: [true]
    },
    date: {
        type: Date,
        required: [true]
    },
    payment: {
        type: Schema.Types.ObjectId, ref: 'Payment'
    }
})

module.exports = mongoose.model("Comment", CommentSchema)