const mongoose = require("mongoose")

const UrlSchema = mongoose.Schema(
	{
		userId: mongoose.Schema.Types.ObjectId,
		title: String,
		url: String,
		image: String,
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("Url", UrlSchema)
