const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Get user's progress data
router.get('/:userId', async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.params.userId });
    res.json(progress || { weightEntries: [], measurements: {}, goals: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update progress data
router.post('/:userId', async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { userId: req.params.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add weight entry
router.post('/:userId/weight', async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { weightEntries: req.body } },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;