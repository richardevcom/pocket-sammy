const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const path = require("path")
const appHost = process.env.VUE_APP_HOST ? process.env.VUE_APP_HOST : "localhost"
const appPort = process.env.VUE_APP_PORT ? process.env.VUE_APP_PORT : 8080

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan("dev")) // configire morgan
app.use(express.static(path.join(__dirname, "dist")))

app.get("*", (req, res) => {
	res.sendFile(__dirname, "/dist/index.html")
})

app.listen(appPort, appHost, () => {
	console.log("Listening at http://%s:%s/", appHost, appPort)
})
