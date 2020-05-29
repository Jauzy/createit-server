const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const ContestSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId, ref:'Client',
        required: [true, 'Please input user id']
    },
    category: {
        type: String,
        required: [true, 'Please input name']
    },
    duration: {
        type: Number,
        required: [true, 'Please input duration']
    },
    brief: {
        type: String
    },
    template: {
        type: Boolean
    },
    picture: {
        type: String
    },
    created: {
        type: Date,
        required: [true, 'Please input date created']
    }
})

//User sebagai nama collection mongoose
module.exports = mongoose.model("Contest", ContestSchema)