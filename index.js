const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 8080

const { resourceRoutes, feedbackRoutes, collectiveRoutes } = require("./routes")

if (process.env.NODE_ENV !== "production") {
	console.log("dev mode")
	const logger = require("morgan")
	require("dotenv").config()
	app.use(logger("dev"))
}

// view engine
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

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
app.use("/api/resource", logger("resource bananas"), resourceRoutes)
app.use("/api/feedback", logger("feedback pears"), feedbackRoutes)
// app.use("/collective", collectiveRoutes)

app.get("/api/:param*", (req, res, next) => {
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
