const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const EventSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'Admin',
        required: [true, 'Please input Admin']
    },
    image_url: {
        type: String, required: [true, 'image url required']
    },
    title: {
        type: String, required: [true, 'title required']
    },
    host: {
        type: String, required: [true, 'host name required']
    },
    event_date: {
        type: Date, required: [true, 'event date required']
    },
    due_date: {
        type: Date, required: [true, 'due date required']
    },
    event_type: {
        type: String, required: [true, 'event type required']
    },
    desc: {
        type: String, required: [true, 'event type required']
    },
    created_date: {
        type: Date, required: [true, 'created date']
    },
    price: {
        type: Number, required: [true, 'price required']
    },
    termsAndCondition: []
})

module.exports = mongoose.model("Event", EventSchema)