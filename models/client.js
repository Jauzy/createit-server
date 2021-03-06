const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const ClientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input name']
    },
    email: {
        type: String,
        required: [true, "Please input email"]
    },
    phone_no: {
        type: String,
    },
    address: {
        type: String,
    },
    profile_pict: {
        type: String,
        default: 'https://storage.cloud.google.com/file-upload-test-bucket/createit_default_profile_pict.svg'
    },
    password: {
        type: String,
        required: [true, "Please input password"]
    },
    verified: {
        type: Boolean
    }
})

module.exports = mongoose.model("Client", ClientSchema)