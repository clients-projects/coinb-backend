
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhraseSchema = new Schema(
    {
        phrase: {
            type: String,
            required: true,
        },
    },
       
    { timestamps: true }
)

module.exports = mongoose.model('phrases', PhraseSchema)
