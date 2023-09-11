const express = require("express")
const router = express.Router()

const { Resource, Feedback, Collective } = require("../models")

router.get("/*", async (req, res) => {
	const url = req.url.slice(1)
	// console.log("params in feedback route:  ", { url })
	try {
		const resourceFeedback = await Resource.findOne({ url })
			.populate({
				path: "feedback",
				select: "classNum likes dislikes -_id",
				options: { sort: { classNum: 1 } },
			})
			.select("-_id")
		// console.log("found a resource:", resourceFeedback)

		res.send(resourceFeedback)
	} catch (err) {
		console.error(err)
		res.send("error")
	}
})

module.exports = {
	router,
}
