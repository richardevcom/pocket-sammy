const dotenv = require("dotenv").config()
const express = require("express")
const path = require("path")
const appHost = process.env.VUE_APP_HOST ? process.env.VUE_APP_HOST : "localhost"
const appPort = process.env.VUE_APP_PORT ? process.env.VUE_APP_PORT : 8080

const app = express()
app.use(express.static(path.join(__dirname, "dist")))

app.get("*", (req, res) => {
	res.sendFile(__dirname, "/dist/index.html")
})

app.listen(appPort, appHost, () => {
	console.log("Listening at http://%s:%s/", appHost, appPort)
})
