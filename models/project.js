const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const ProjectSchema = new Schema({
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
        type: Boolean
    },
    notes: {
        type: String,
    },
    durationDays: {
        type: Number
    },
    budget: {
        type: Number
    },
    //misc
    payment: {
        type: Schema.Types.ObjectId, ref: 'Payment'
    },
    designer : [{type: Schema.Types.ObjectId, ref:'Creator'}],
    startDate: {
        type: String
    },
    status: String
})

module.exports = mongoose.model("Project", ProjectSchema)