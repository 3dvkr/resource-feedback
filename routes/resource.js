const express = require("express")
const ogs = require("open-graph-scraper")
const router = express.Router()

const { getUrlFormat } = require("../utils/url-format")

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
				select: "url name format description",
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
			const data = await ogs({ url })
			const { error, result } = data
			if (!error) {
				resource = new Resource({
					url,
					name: result.ogTitle,
					description: result.ogDescription.slice(0, 50).trim(),
					format: getUrlFormat(result.ogType),
				})
			} else {
				resource = new Resource({ url })
			}
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

		res.send({ message: "success" })
	} catch (err) {
		res.send(err)
	}
})

module.exports = {
	router,
}
