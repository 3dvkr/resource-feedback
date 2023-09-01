const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT || 3000

const { Resource, Feedback, Collective } = require("./models")
const { resourceRoutes, feedbackRoutes, collectiveRoutes } = require("./routes")
console.log({port}, process.env.PORT)
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config()
}

// view engine
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// database connection and start server
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => {
	console.log("Connected to Mongoose")
	app.listen(port, () => {
		console.log(`Listening on port ${port}`)
	})
})
const logger = (str) => {
	return (req, res, next) => {
		console.log(str)
		next()
	}
}

// main routes for app
app.use("/resource", logger("resource bananas"), resourceRoutes)
app.use("/feedback", logger("feedback pears"), feedbackRoutes)
// app.use("/collective", collectiveRoutes)

app.get("/:param*", (req, res, next) => {
	const { param } = req.params
	console.log("params idk ", { param })
	const url = req.url.slice(1)
	if (Number.isNaN(Number(url))) {
		res.redirect(`/feedback/${url}`)
		// /100devs/feedback/shayhowe.com
	} else {
		res.redirect(`/resource/${url}`)
	}
})

app.get("/", (req, res) => {
	res.render("pages/index", {})
})
