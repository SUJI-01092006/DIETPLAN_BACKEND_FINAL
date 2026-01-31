const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  lunch: String
});

module.exports = mongoose.model("Meal", mealSchema);
