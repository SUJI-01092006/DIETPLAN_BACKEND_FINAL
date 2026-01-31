const mongoose = require('mongoose');

const groceryListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    category: String,
    name: String,
    quantity: String,
    checked: {
      type: Boolean,
      default: false
    },
    estimatedCost: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GroceryList', groceryListSchema);