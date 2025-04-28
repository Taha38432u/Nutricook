const mongoose = require('mongoose');

const inboxSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  type: {
    type: String,
    enum: ['reactivate', 'report'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Inbox = mongoose.model('Inbox', inboxSchema);

module.exports = Inbox;
