module.exports = (app) => {
	const urls = require("../controllers/url.controller.js")

	// Create a new Url
	app.post("/api/urls", urls.create)

	// Retrieve all Url
	app.get("/api/urls", urls.findAll)

	// Retrieve a single Url with urlId
	app.get("/api/urls/user/:userId", urls.findByUserId)

	// Retrieve a single Url with urlId
	app.get("/api/urls/:urlId", urls.findOne)

	// Update a Url with urlId
	app.put("/api/urls/:urlId", urls.update)

	// Delete a Url with urlId
	app.delete("/api/urls/:urlId", urls.delete)
}
