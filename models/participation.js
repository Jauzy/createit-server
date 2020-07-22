const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const ParticipationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'Creator',
        required: [true, 'Please input user id']
    },
    contest: {
        type: Schema.Types.ObjectId, ref: 'Contest',
    },
    project: {
        type: Schema.Types.ObjectId, ref: 'Project'
    },
    image_url: {
        type: String,
    },
    desc: {
        type: String
    },
    date_uploaded: {
        type: Date
    },
    comment: [

    ],
    rate: []
})

module.exports = mongoose.model("Participation", ParticipationSchema)