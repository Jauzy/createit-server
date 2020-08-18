const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const ProjectPaymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'Client',
        required: [true, 'Please input user id']
    },
    project: {
        type: Schema.Types.ObjectId, ref: 'Project',
        required: [true, 'Please input project id']
    },
    for: {
        type: Schema.Types.ObjectId, ref: 'Creator',
        required: [true, 'Receiver']
    },
    receiver_bank: {
        type: String,
        required: [true, 'Please input bank']
    },
    receiver_account_no: {
        type: String,
        required: [true, 'Please input account no']
    },
    sender_bank: {
        type: String,
    },
    sender_account_no: {
        type: String,
    },
    amount: {
        type: Number
    },
    proofOfPayment: {
        type: String
    },
    status: {
        type: String
    },
    approved: {
        type: Schema.Types.ObjectId, ref: 'Admin'
    },
    created_at: {
        type: Date
    }
})

module.exports = mongoose.model("ProjectPayment", ProjectPaymentSchema)