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
        required: [true, 'Please input contest id']
    },
    image_url: {
        type: String,
        required: [true, 'Please input image url']
    },
    selected: {
        type: Boolean
    }
})

module.exports = mongoose.model("Participation", ParticipationSchema)