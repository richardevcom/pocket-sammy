module.exports = (app) => {
	const users = require("../controllers/user.controller.js")
	const auth = require("../middleware/auth.middleware.js")

	// Create a new user
	app.post("/register", users.register)

	// Authenticate user
	app.post("/login", users.login)

	// Show account details
	app.get("/account", auth, users.account)
}
