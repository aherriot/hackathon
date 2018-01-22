const express = require('express')
const mongoose = require('mongoose')

const User = require('../models/User')
const Idea = require('../models/Idea')
const Comment = require('../models/Comment')

const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const respondWithError = require('../utils/respondWithError')

const router = express.Router()

// get list of all ideas
router.get('/', async function(req, res) {
  let ideas
  try {
    ideas = await Idea.find({})
      .populate('creator', 'name csl') // fill in foreign key with name
      .populate('members', 'name') // fill in foreign key with name
  } catch (err) {
    return respondWithError(res, err)
  }

  const respObj = ideas.map(idea => {
    return {
      _id: idea._id,
      createdAt: idea.createdAt,
      creator: idea.creator,
      description: idea.description,
      members: idea.members,
      numberOfComments: idea.comments.length
    }
  })

  return res.json(ideas)
})

// Add a new idea
router.post('/', auth, async function(req, res) {
  if (!req.body.description) {
    return respondWithError(res, 'descriptionMissing')
  }

  try {
    let idea = new Idea({
      creator: req.user._id,
      description: req.body.description
    })

    // if the user wants to join the idea that are creating
    if (req.body.join) {
      // first remove them from other ideas
      try {
        await Idea.update(
          { members: [req.user._id] },
          { $pullAll: { members: [req.user._id] } }
        )
      } catch (err) {
        return respondWithError(res, err)
      }

      idea.members.push(req.user._id)
    }

    await idea.save()
    idea = await User.populate(idea, { path: 'creator', select: 'name' })
    idea = await User.populate(idea, { path: 'members', select: 'name' })

    return res.json(idea)
  } catch (err) {
    return respondWithError(res, err)
  }
})

// edit idea description
router.put('/:ideaId', auth, async function(req, res) {
  if (!req.body.description) {
    return respondWithError(res, 'descriptionMissing')
  }

  let idea
  try {
    idea = await Idea.findById(req.params.ideaId)
    if (!idea) {
      return respondWithError(res, 'ideaNotFound')
    }
  } catch (err) {
    return respondWithError(res, err)
  }

  if (
    !idea.creator.equals(mongoose.Types.ObjectId(req.user._id)) &&
    req.user.role !== 'admin'
  ) {
    return respondWithError(res, 'userWrong')
  }

  idea.description = req.body.description

  try {
    await idea.save()
    return res.json(idea)
  } catch (err) {
    return respondWithError(res, err)
  }
})

// delete idea
router.delete('/:ideaId', auth, async function(req, res) {
  let idea
  try {
    idea = await Idea.findById(req.params.ideaId)
    if (!idea) {
      return respondWithError(res, 'ideaNotFound')
    }
  } catch (err) {
    return respondWithError(res, err)
  }

  // only allow users to delete their own ideas
  if (
    !idea.creator.equals(mongoose.Types.ObjectId(req.user._id)) &&
    req.user.role !== 'admin'
  ) {
    return respondWithError(res, 'userWrong')
  }

  try {
    await idea.remove()
    return res.json(idea)
  } catch (err) {
    return respondWithError(res, err)
  }
})

// join an existing idea
router.patch('/:ideaId/join', auth, async function(req, res) {
  let idea

  try {
    idea = await Idea.findById(req.params.ideaId)
  } catch (err) {
    return respondWithError(res, err)
  }

  if (!idea) {
    return respondWithError(res, 'ideaNotFound')
  }

  if (idea.members.length > 5) {
    return respondWithError(res, 'ideaIsFull')
  }

  // find the existing idea the this user is signed up for
  // and remove them
  try {
    await Idea.update(
      { members: [req.user._id] },
      { $pullAll: { members: [req.user._id] } }
    )
  } catch (err) {
    return respondWithError(res, err)
  }

  // add the member to the new idea
  idea.members.push(req.user._id)

  try {
    await idea.save()
    return res.json(idea)
  } catch (err) {
    return respondWithError(res, err)
  }
})

// leave an existing idea
router.patch('/:ideaId/leave', auth, async function(req, res) {
  // find the existing idea the this user is signed up for
  // and remove them
  try {
    await Idea.update(
      { members: [req.user._id] },
      { $pullAll: { members: [req.user._id] } }
    )

    return res.json(true)
  } catch (err) {
    return respondWithError(res, err)
  }
})

// get list of comments for a specific idea
router.get('/:ideaId/comments', async function(req, res) {
  let idea
  try {
    idea = await Idea.findOne({ _id: req.params.ideaId }, 'comments')
      .populate({
        path: 'comments'
      })
      .exec()
  } catch (err) {
    return respondWithError(res, err)
  }

  idea = await User.populate(idea, { path: 'comments.userId', select: 'name' })

  return res.json(idea.comments)
})

router.post('/:ideaId/comments', auth, async function(req, res) {
  if (!req.body.text) {
    return respondWithError(res, 'textMissing')
  } else if (req.body.text.length < 2 || req.body.text.length > 300) {
    return respondWithError(res, 'textLength')
  }

  let idea
  try {
    idea = await Idea.findOneById(req.params.ideaId, 'comments')
  } catch (err) {
    return respondWithError(res, err)
  }

  if (!idea) {
    return respondWithError(res, 'ideaNotFound')
  }

  let comment = new Comment({
    userId: req.user._id,
    text: req.body.text
  })

  idea.comments.push(comment)

  try {
    await idea.save()
  } catch (err) {
    return respondWithError(res, err)
  }

  return res.json(comment)
})

module.exports = router
