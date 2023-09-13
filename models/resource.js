const mongoose = require("mongoose")
const { Schema } = mongoose

const resourceSchema = new Schema({
	name: { required: false, type: String, default: "" },
	url: { required: true, type: String, unique: true },
	description: { required: false, type: String },
	format: { required: false, type: String },
	feedback: [
		{
			required: false,
			type: mongoose.ObjectId,
			ref: "Feedback",
		},
	],
})

resourceSchema.pre("save", function (next) {
	if (this.feedback.length === 0) {
		throw new Error("Resource requires at least one referenced feedback document")
	}
	next()
})

const Resource = mongoose.model("Resource", resourceSchema)

module.exports = { Resource }
