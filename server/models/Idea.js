const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ideaSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  description: { type: String },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

module.exports = mongoose.model('Idea', ideaSchema)
