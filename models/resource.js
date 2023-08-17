const mongoose = require("mongoose")
const { Schema } = mongoose

const resourceSchema = new Schema({
	name: { required: false, type: String, default: "" },
	url: { required: true, type: String },
	format: { required: false, type: String },
	feedback: [
		{
			required: false,
			type: mongoose.ObjectId,
			ref: "Feedback",
		},
	],
})

const Resource = mongoose.model("Resource", resourceSchema)

module.exports = { Resource }
