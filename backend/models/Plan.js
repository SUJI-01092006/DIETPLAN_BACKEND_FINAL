const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planName: String,
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
  currentWeight: Number,
  targetWeight: Number,
  height: Number,
  age: Number,
  gender: String,
  weightLossRate: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plan', planSchema);