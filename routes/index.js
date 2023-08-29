const { router: feedbackRoutes } = require("./feedback")
const { router: resourceRoutes } = require("./resource")
const { router: collectiveRoutes } = require("./collective")

module.exports = {
	feedbackRoutes,
	resourceRoutes,
	collectiveRoutes,
}
