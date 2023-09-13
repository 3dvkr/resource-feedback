module.exports = {
	getUrlFormat: function (urlType) {
		if (urlType) {
			const ogType = urlType.toLowerCase()
			if (ogType.includes("video")) {
				return "Video"
			} else if (ogType.includes("audio")) {
				return "Audio"
			} else if (ogType.includes("article")) {
				return "Article"
			} else {
				return "Website"
			}
		} else {
			return null
		}
	},
}
