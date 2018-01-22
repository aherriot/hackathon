const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  text: { type: String }
})

module.exports = mongoose.model('Comment', commentSchema)
