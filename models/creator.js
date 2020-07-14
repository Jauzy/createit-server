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
    profile_pict: {
        type: String,
        default: 'https://storage.cloud.google.com/file-upload-test-bucket/createit_default_profile_pict.svg'
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