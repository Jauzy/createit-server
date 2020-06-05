const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const ContestSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId, ref:'Client',
        required: [true, 'Please input user id']
    },
    title: {
        type: String,
        required: [true, 'Please input title']
    },
    category: {
        type: String,
        required: [true, 'Please input category']
    },
    sub_category: {
        type: String,
        required: [true, 'Please input sub category']
    },
    duration: {
        type: Number,
        required: [true, 'Please input duration']
    },
    brief: {
        type: String
    },
    resource_link: {
        type: String
    },
    start_date: {
        type: Date
    },
    created: {
        type: Date,
        required: [true, 'Please input date created']
    },
    published: {
        type: Boolean,
        required: [true, 'Please input published or not']
    },
    entries: {
        type : Number,
        required: [true, 'Please input entries']
    },
    bank : {
        type : String
    },
    account_no : {
        type : String
    },
    paid_by_client: {
        type: Boolean
    }
})

module.exports = mongoose.model("Contest", ContestSchema)