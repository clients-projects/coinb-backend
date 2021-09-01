const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            default: 'Admin'
        },
    },
    { timestamps: true}
)

module.exports = mongoose.model('users', userSchema)
