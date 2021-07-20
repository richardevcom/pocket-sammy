const User = require("../models/user.model.js")

// Create new user
exports.register = async (req, res) => {
	try {
		let isUser = await User.find({ email: req.body.email })

		if (isUser.length >= 1) {
			return res.status(409).json({
				message: "Account with that e-mail has already been registered!",
			})
		}
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
		let data = await user.save()
		const token = await user.generateAuthToken() // here it is calling the method that we created in the model
		res.status(201).json({ data, token })
	} catch (err) {
		res.status(400).json({ err: err })
	}
}

// Login user
exports.login = async (req, res) => {
	try {
		const email = req.body.email
		const password = req.body.password
		const user = await User.findByCredentials(email, password)
		if (!user) {
			return res.status(401).json({ error: "Login failed! Check authentication credentials" })
		}
		const token = await user.generateAuthToken()
		res.status(201).json({ user, token })
	} catch (err) {
		res.status(400).json({ err: err })
	}
}

// Show user account details
exports.account = async (req, res) => {
	await res.json(req.userData)
}
