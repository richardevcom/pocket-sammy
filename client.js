const cors = require("cors")
const dotenv = require("dotenv").config()
const express = require("express")
const history = require("connect-history-api-fallback")
const path = require("path")
const appHost = process.env.VUE_APP_HOST ? process.env.VUE_APP_HOST : "0.0.0.0"
const appPort = process.env.VUE_APP_PORT ? process.env.VUE_APP_PORT : 8080

const app = express()

app.use(cors())

app.use(express.static(path.join(__dirname, "dist")))
app.use(
	history({
		disableDotRule: true,
		verbose: true,
	})
)

app.get("*", (req, res) => {
	res.sendFile(__dirname, "/dist/index.html")
})

app.listen(appPort, appHost, () => {
	console.log("Listening at http://%s:%s/", appHost, appPort)
})
