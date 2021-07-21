module.exports = (app) => {
	const urls = require("../controllers/url.controller.js")

	// Create a new Url
	app.post("/urls", urls.create)

	// Retrieve all Url
	app.get("/urls", urls.findAll)

	// Retrieve a single Url with urlId
	app.get("/urls/user/:userId", urls.findByUserId)

	// Retrieve a single Url with urlId
	app.get("/urls/:urlId", urls.findOne)

	// Update a Url with urlId
	app.put("/urls/:urlId", urls.update)

	// Delete a Url with urlId
	app.delete("/urls/:urlId", urls.delete)
}
