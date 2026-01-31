const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');

// Get user's meal plans
router.get('/:userId', async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new meal plan
router.post('/', async (req, res) => {
  try {
    const mealPlan = new MealPlan(req.body);
    await mealPlan.save();
    res.status(201).json(mealPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update meal plan
router.put('/:id', async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(mealPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete meal plan
router.delete('/:id', async (req, res) => {
  try {
    await MealPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal plan deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;