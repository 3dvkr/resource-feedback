const express = require("express")
const router = express.Router()

const { Resource, Feedback, Collective } = require("../models")

router.get("/", (req, res) => {
	console.log("get resource")
})

router.get("/:classNum", async (req, res) => {
	// lrn.cyclic.app/resource/classNum
	const { classNum } = req.params
	// console.log("getting a feedback doc: ", classNum, typeof classNum)
	try {
		const feedbackDocs = await Feedback.find({ classNum })
			.populate({
				path: "resourceRef",
				select: "url name",
			})
			.select("likes dislikes resourceRef")
			.lean()

		res.render("pages/resources", { feedbackDocs })
	} catch (err) {
		console.log(err)
		res.send("error")
	}
})

// TODO: remove this after switching to React?
router.post("/", async (req, res) => {
	const { url, classNumber, classRating } = req.body
	console.log("posting feedback: ", { url, classNumber, classRating })
	try {
		// find resource with url
		let resource = await Resource.findOne({ url }).select("_id feedback")
		const isNewResource = !resource
		console.log("found resource: ", resource)
		// if not found, create the resource
		if (!resource) {
			resource = new Resource({ url })
		}

		// find feedback for the class and resource
		let feedback = !isNewResource && await Feedback.findOne({
			classNum: classNumber,
			resourceRef: resource._id,
		})
		
		if (!feedback) {
			feedback = new Feedback({
				classNum: classNumber,
				likes: !!classRating,
				dislikes: !classRating,
				resourceRef: resource._id,
			})
			resource.feedback.push(feedback)
		} else {
			feedback.likes += !!classRating
			feedback.dislikes += !classRating
		}

		await feedback.save()
		await resource.save()

		res.redirect("/" + classNumber)
	} catch (err) {
		res.send("ERROR: " + err.message)
	}
})

module.exports = {
	router,
}
