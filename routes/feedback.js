const express = require("express")
const router = express.Router()

const { Resource, Feedback, Collective } = require("../models")

router.get("/:path*", async (req, res) => {
	const url = req.url.slice(1)
	try {
		const resource = await Resource.findOne({ url })
		console.log("found a resource:", resource)
		if (!resource) {
			// ask for information about resource (name-- scraped then stored?)
			res.send({ foundResource: false })
			return
		}
		// form would only have url (filled in), class number, and isLiked
		res.send({ foundResource: true, name: resource.resourceName })
	} catch (err) {
		console.log(err)
		res.send("error")
	}
})

router.post("/:url*", async (req, res) => {
	const { url } = req.params
	const {} = req.body
	// there's a roughed out controller in controllers/index.js
})

module.exports = {
	router,
}
