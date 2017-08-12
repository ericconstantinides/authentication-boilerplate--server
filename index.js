const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

// Use native Node promises
mongoose.Promise = global.Promise

// DB Setup
// Creates a new database called "auth"
mongoose.connect('mongodb://localhost/auth', { useMongoClient: true })
  .then(() => console.log('connection to erics-node-todo db succesful'))
  .catch((err) => console.error(err))

// App Setup
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server Setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on: ', port)
