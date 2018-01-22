const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Idea = require('./Idea')

const userSchema = new Schema({
  csl: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  createdAt: { type: Date, default: Date.now }
})

userSchema.pre('remove', function(next) {
  Idea.remove({ useurId: this._id }).exec()
  next()
})

module.exports = mongoose.model('User', userSchema)
