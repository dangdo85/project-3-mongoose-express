const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const commentSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId, // single user
        ref: 'User' // string value from the model creation 
    }
},{
    timestamps: true
})

module.exports = commentSchema