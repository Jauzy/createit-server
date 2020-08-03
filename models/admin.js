const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const AdminSchema = new Schema ({
    name : {
        type : String,
        required : [true, 'Please input name']
    },
    email : {
        type : String,
        required : [true, "Please input email"]
    },
    password : {
        type : String,
        required: [true, "Please input password"]
    },
    verified: {
        type: Boolean
    }
})

module.exports = mongoose.model("Admin", AdminSchema)