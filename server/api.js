const express = require('express')
const bodyParser = require('body-parser')

const users = require('./controllers/users')
const ideas = require('./controllers/ideas')

const api = express.Router()

// parse JSON on incoming requests
api.use(bodyParser.json())

api.use('/users', users)
api.use('/ideas', ideas)

api.all('*', function(req, res) {
  res.status(404).json({ code: 'notFound', message: 'path not found' })
})

module.exports = api
