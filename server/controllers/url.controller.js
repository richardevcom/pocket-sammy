const Url = require("../models/url.model.js")

// Create and Save a new Url
exports.create = async (req, res) => {
	// Validate request
	if (!req.body.url) {
		return res.status(400).send({
			message: "URL cannot be empty!",
		})
	}

	let scrapeData = {}

	const metascraper = require("metascraper")([require("metascraper-image")(), require("metascraper-title")(), require("metascraper-url")()])

	const got = require("got")

	const targetUrl = req.body.url

	const { body: html, url } = await got(targetUrl).catch((e) => {
		console.log(e)
	})

	scrapeData = await metascraper({ html, url })

	// Create a URL
	const saveUrl = new Url({
		userId: req.body.userId,
		title: scrapeData.title ? scrapeData.title : req.body.title || "Untitled URL",
		url: scrapeData.url ? scrapeData.url : req.body.url,
		image: scrapeData.image ? scrapeData.image : req.body.image,
	})

	// Save URL in the database
	saveUrl
		.save()
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "An error occurred while creating URL.",
			})
		})
}

// Retrieve and return all Urls from the database.
exports.findAll = (req, res) => {
	Url.find()
		.then((urls) => {
			res.send(urls)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "An error occurred while retrieving URLs.",
			})
		})
}

// Retrieve and return all Urls from the database.
exports.findByUserId = (req, res) => {
	Url.find({ userId: req.params.userId })
		.then((urls) => {
			res.send(urls)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "An error occurred while retrieving URLs.",
			})
		})
}

// Find a single Url with a urlId
exports.findOne = (req, res) => {
	Url.findById(req.params.urlId)
		.then((url) => {
			if (!url) {
				return res.status(404).send({
					message: "URL with id " + req.params.urlId + " was not found.",
				})
			}
			res.send(url)
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "URL with id " + req.params.urlId + " was not found.",
				})
			}
			return res.status(500).send({
				message: "An error occured while retrieving url with id " + req.params.urlId + ".",
			})
		})
}

// Update a Url identified by the urlId in the request
exports.update = (req, res) => {
	// Validate Request
	if (!req.body.url) {
		return res.status(400).send({
			message: "URL cannot be empty!",
		})
	}

	// Find url and update it with the request body
	Url.findByIdAndUpdate(
		req.params.urlId,
		{
			image: req.body.image,
			title: req.body.title,
			url: req.body.url,
			public: true,
		},
		{ new: true }
	)
		.then((url) => {
			if (!url) {
				return res.status(404).send({
					message: "URL with id " + req.params.urlId + " was not found.",
				})
			}
			res.send(url)
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "URL with id " + req.params.urlId + " was not found.",
				})
			}
			return res.status(500).send({
				message: "An error occured while updating URL with id " + req.params.urlId + ".",
			})
		})
}

// Delete a Url with the specified urlId in the request
exports.delete = (req, res) => {
	Url.findByIdAndRemove(req.params.urlId)
		.then((url) => {
			if (!url) {
				return res.status(404).send({})
			}
			res.send({ message: "URL deleted successfully!" })
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({})
			}
			return res.status(500).send({
				message: "Could not delete URL with id " + req.params.urlId,
			})
		})
}
