const express = require("express")
const router = express.Router()

const { Resource, Feedback, Collective } = require("../models")

router.get("/", (req, res) => {
	console.log("get resource")
})

router.get("/:classNum", async (req, res) => {
	// lrn.cyclic.app/resource/classNum
	const { classNum } = req.params
	try {
		const feedbackDocs = await Feedback.find({ classNum })
			.populate({
				path: "resourceRef",
				select: "url name",
			})
			.select("likes dislikes resourceRef")
			.lean()
		res.send(feedbackDocs)
	} catch (err) {
		console.error(err)
		res.send(err)
	}
})

router.post("/", async (req, res) => {
	const { url, classNumber, classRating } = req.body
	try {
		// find resource with url
		let resource = await Resource.findOne({ url }).select("_id feedback")
		const isNewResource = !resource
		
		// if not found, create the resource
		if (isNewResource) {
			resource = new Resource({ url })
		}

		// find feedback for the class and resource
		let feedback =
			!isNewResource &&
			(await Feedback.findOne({
				classNum: classNumber,
				resourceRef: resource._id,
			}))

		if (!feedback) {
			feedback = new Feedback({
				classNum: classNumber,
				likes: classRating ? 1 : 0,
				dislikes: !classRating ? 1 : 0,
				resourceRef: resource._id,
			})
			resource.feedback.push(feedback)
		} else {
			feedback.likes += classRating ? 1 : 0
			feedback.dislikes += !classRating ? 1 : 0
		}

		await feedback.save()
		await resource.save()

		res.send({message: "success"})
	} catch (err) {
		res.send(err)
	}
})

module.exports = {
	router,
}
