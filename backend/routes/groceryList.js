const express = require('express');
const router = express.Router();
const GroceryList = require('../models/GroceryList');

// Get user's grocery list
router.get('/:userId', async (req, res) => {
  try {
    const groceryList = await GroceryList.findOne({ userId: req.params.userId });
    res.json(groceryList || { items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update grocery list
router.post('/:userId', async (req, res) => {
  try {
    const groceryList = await GroceryList.findOneAndUpdate(
      { userId: req.params.userId },
      { items: req.body.items, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json(groceryList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add item to grocery list
router.post('/:userId/items', async (req, res) => {
  try {
    const groceryList = await GroceryList.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { items: req.body } },
      { new: true, upsert: true }
    );
    res.json(groceryList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;