const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const config = require('../config')

const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const respondWithError = require('../utils/respondWithError')

const router = express.Router()

const usernameRegex = /^[a-zA-Z0-9-_.]+$/
function isCslValid(username) {
  return usernameRegex.test(username)
}

// get a list of all registered users.
// restricted to admins only
router.get('/', auth, admin, async function(req, res) {
  try {
    const users = await User.find(
      {},
      { csl: 1, name: 1, role: 1, createdAt: 1 }
    )
    return res.json(users)
  } catch (err) {
    return respondWithError(res, err)
  }
})

// return a JWT for the user with the same csl,
// or create a new user if the csl doesn't exist yet (and return same JWT)
// Not really secure, but who cares? I don't really want to ask for passwords
// because then everyone will stupidly give me their actual csl passwords.
router.post('/login', async function(req, res) {
  if (!req.body.csl) {
    return respondWithError(res, 'cslMissing')
  } else if (req.body.csl.length < 3 || req.body.csl.length > 10) {
    return respondWithError(res, 'cslLength')
  } else if (!isCslValid(req.body.csl)) {
    return respondWithError(res, 'cslInvalid')
  } else if (!req.body.name) {
    return respondWithError(res, 'nameMissing')
  } else if (req.body.name.length < 5 || req.body.name.length > 40) {
    return respondWithError(res, 'nameLength')
  }

  try {
    let user = await User.findOne({
      csl: req.body.csl.toLowerCase()
    })

    // if the user exists,
    // we update the name to match
    // in case the user wants to edit their name
    if (user) {
      user.name = req.body.name
    } else {
      // if it doesn't exist, we save it.
      user = new User({
        csl: req.body.csl.toLowerCase(),
        name: req.body.name
      })
    }

    try {
      await user.save()
    } catch (err) {
      return respondWithError(res, err)
    }

    const token = jwt.sign(
      { _id: user._id, csl: user.csl, name: user.name, role: user.role },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY
      }
    )

    return res.json({ token: token })
  } catch (err) {
    return respondWithError(res, err)
  }
})

router.delete('/:id', auth, async function(req, res) {
  if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
    return respondWithError(res, 'userWrong')
  }
  try {
    const user = await User.findByIdAndRemove(req.params.id)

    // we do this to perform cascading deletes
    if (user) {
      user.remove()
    }

    res.json({ success: true })
  } catch (err) {
    respondWithError(res, err)
  }
})

module.exports = router
