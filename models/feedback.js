const mongoose = require("mongoose")
const { Schema } = mongoose

const feedbackSchema = new Schema({
	classNum: { required: true, type: Number },
	altName: { required: false, type: String },
	resourceRef: {
		required: true,
		type: mongoose.ObjectId,
		ref: "Resource",
	},
	likes: { required: true, type: Number },
	dislikes: { required: true, type: Number },
})

const Feedback = mongoose.model("Feedback", feedbackSchema)

module.exports = { Feedback }
