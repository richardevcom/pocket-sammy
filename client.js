const cors = require("cors")
const dotenv = require("dotenv").config()
var express = require("express")
var history = require("connect-history-api-fallback")
const appHost = process.env.VUE_APP_HOST ? process.env.VUE_APP_HOST : "0.0.0.0"
const appPort = process.env.VUE_APP_PORT ? process.env.VUE_APP_PORT : 8080

var app = express()

app.use(cors())

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static("dist")

// 1st call for unredirected requests
app.use(staticFileMiddleware)

// Support history api
// this is the HTTP request path not the path on disk
app.use(
	history({
		index: "/index.html",
	})
)

// 2nd call for redirected requests
app.use(staticFileMiddleware)

app.listen(appPort, appHost, function() {
	console.log("Example app listening on port %s!", appPort)
})
