const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const EventPaymentSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId, ref: 'Client'
    },
    creator: {
        type: Schema.Types.ObjectId, ref: 'Creator'
    },
    event: {
        type: Schema.Types.ObjectId, ref: 'Event',
        required: [true, 'Please input event id']
    },
    bank: {
        type: String,
        required: [true, 'Please input bank']
    },
    account_no: {
        type: String,
        required: [true, 'Please input account no']
    },
    proofOfPayment: {
        type: String
    },
    approved: {
        type: Schema.Types.ObjectId, ref: 'Admin'
    }
})

module.exports = mongoose.model("EventPayment", EventPaymentSchema)