module.exports = (app) => {
	const users = require("../controllers/user.controller.js")
	const auth = require("../middleware/auth.middleware.js")

	// Create a new user
	app.post("/api/register", users.register)

	// Authenticate user
	app.post("/api/login", users.login)

	// Show account details
	app.get("/api/account", auth, users.account)
}
