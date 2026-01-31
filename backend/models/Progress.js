const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weightEntries: [{
    weight: Number,
    date: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  measurements: {
    waist: Number,
    chest: Number,
    hips: Number,
    arms: Number,
    date: Date
  },
  goals: {
    targetWeight: Number,
    targetDate: Date,
    weeklyGoal: Number
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Progress', progressSchema);