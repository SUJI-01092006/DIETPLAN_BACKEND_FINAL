const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  tags: [String],
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  fiber: Number,
  time: String,
  description: String,
  ingredients: [String],
  instructions: [String],
  saved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);