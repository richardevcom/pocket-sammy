const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Please provide your email"],
		},
		password: {
			type: String,
			required: [true, "Please provide your password"],
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
)

UserSchema.pre("save", async function(next) {
	const user = this
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
})

//this method generates an auth token for the user
UserSchema.methods.generateAuthToken = async function() {
	const user = this
	const token = jwt.sign({ _id: user._id, email: user.email }, "secret")
	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
}

//this method search for a user by email and password.
UserSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error({ error: "Invalid login details" })
	}
	const isPasswordMatch = await bcrypt.compare(password, user.password)
	if (!isPasswordMatch) {
		throw new Error({ error: "Invalid login details" })
	}
	return user
}

const User = mongoose.model("User", UserSchema)
module.exports = mongoose.model("User", UserSchema)
