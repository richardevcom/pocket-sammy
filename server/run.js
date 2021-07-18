const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose')
const app = express()
// Let's preset some server & database config vars to defaults
const srvHost = process.env.SRV_HOST ? process.env.SRV_HOST : '127.0.0.1'
const srvPort = process.env.SRV_PORT ? process.env.SRV_PORT : 8080
const dbUrl = process.env.DB_URL ? process.env.DB_URL : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=${process.env.DB_NAME}&replicaSet=${process.env.DB_REP}&tls=true&tlsCAFile=${process.env.DB_CERT}`
// db status
let dbStatus = {}

// init db
mongoose.Promise = global.Promise;

// if we have either db string or parameters, start connection
if(dbUrl) {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true
    }).then(() => {
        // Once connected, let' s init our app
        console.log("\n[✔] Successfully connected to the database")
        dbStatus = {
            "status":"ok",
            "message":"Welcome to Pocket Sammy - what's your URL for today, sir?"
        }
    }).catch(err => {
        // If we can't connect to db, let's still init our app, but instead always return status - err
        console.log('[❌] Could not connect to the database. \nYou can edit and save project files and the nodemon will restart automatically!\n', err)
        // process.exit()
        dbStatus = {
            "status":"error",
            "message":"Uff! An critical error happened while starting MongoDB!"
        }
    })
}

// Parse application/x-www-form-urlencoded & application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if(dbStatus["status"] == "ok") {
    // Init our api routes
    require("./routes/url.routes")(app)

    // Init server
    app.listen(srvPort, function(){
        console.log(`[✔] Server started on http://${srvHost}:${srvPort}.\n`)
    })

    // Return motd on abspath GET request
    app.get('/', (req, res) => {
        res.json(dbStatus)
    })
}else{
    // Init server
    app.listen(srvPort, function(){
        console.log(`[✔] Server started on http://${srvHost}:${srvPort} with some errors!!!\n`)
    })

    // Return motd on abspath GET request
    app.get('/', (req, res) => {
        res.json(dbStatus)
    })
}
