const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  fiber: Number,
  sugar: Number,
  duration: Number,
  mealsPerDay: Number,
  dietType: String,
  activityLevel: String,
  meals: [{
    day: String,
    mealType: String,
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);