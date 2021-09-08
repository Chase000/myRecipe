const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  recipeName: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  modifiedDate: {
    type: String,
  },
  modifiedTime: {
    type: String,
  },
  picture: {
    type: String,
  },
  type: {
    type: String,
  },
  method: [{
    type: String,
  }],
  ingredients: [
    String
  ],
  favorites_IDs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isPrivate: {
    type: Boolean,
  },
  commentsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }]
});

const recipeDB = mongoose.model('Recipe', recipeSchema);
module.exports = recipeDB;
