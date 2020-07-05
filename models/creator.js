const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const CreatorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input name']
    },
    email: {
        type: String,
        required: [true, "Please input email"]
    },
    password: {
        type: String,
        required: [true, "Please input password"]
    },
    category: {
        type: String,
    },
    phone_no: {
        type: String,
    },
    instagram_username: {
        type: String
    },
    studio_name: {
        type: String
    },
    studio_instagram_username: {
        type: String
    },
    bio: {
        type: String
    },
    expertise: {
        type: String
    },
    portofolio_link: {
        type: String
    },
})

module.exports = mongoose.model("Creator", CreatorSchema)