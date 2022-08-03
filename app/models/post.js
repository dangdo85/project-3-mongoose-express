const mongoose = require('mongoose')
const commentSchema = require('./comment')

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		caption: {
			type: String,
			required: false,
		},
		image: String,
		likes: {
			type: Number,
			default: 0
		},
		comments: [commentSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Post', postSchema)
