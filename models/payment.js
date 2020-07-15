const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const PaymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'Client',
        required: [true, 'Please input user id']
    },
    contest: {
        type: Schema.Types.ObjectId, ref: 'Contest',
        required: [true, 'Please input contest id']
    },
    bank: {
        type: String,
        required: [true, 'Please input bank']
    },
    account_no: {
        type: String,
        required: [true, 'Please input account no']
    },
    amount : {
        type: Number
    },
    proofOfPayment: {
        type: String
    }
})

module.exports = mongoose.model("Payment", PaymentSchema)