const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const ContestSchema = new Schema({
    //brief
    user: {
        type: Schema.Types.ObjectId, ref: 'Client',
        required: [true, 'Please input user id']
    },
    name: {
        type: String,
        required: [true, 'Please input name']
    },
    category: {
        type: String,
        required: [true, 'Please input category']
    },
    subCategory: {
        type: String,
        required: [true, 'Please input category']
    },
    desc: {
        type: String
    },
    purpose: {
        type: String
    },
    reference: [String],
    industryType: {
        type: String,
    },
    social: {
        type: String
    },
    creatorPermission: {
        type: String
    },
    notes: {
        type: String,
    },
    //pricing
    durationHours: {
        type: Number
    },
    pricingPack: {
        type: String
    },
    contestType: {
        type: String
    },
    //misc
    winner: {
        type: Schema.Types.ObjectId, ref: 'Participation'
    },
    status : {
        type: String
    },
    startDate: {
        type: String
    },
})

module.exports = mongoose.model("Contest", ContestSchema)