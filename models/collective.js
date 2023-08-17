const mongoose = require("mongoose")
const { Schema } = mongoose

const collectiveSchema = new Schema({
	name: { required: true, type: String, default: "" },
	url: { required: false, type: String },
	type: { required: false, type: String },
	resources: [
		{
			required: false,
			type: mongoose.ObjectId,
			ref: "Resource",
		},
	],
})

const Collective = mongoose.model("Collective", collectiveSchema)

module.exports = { Collective }
