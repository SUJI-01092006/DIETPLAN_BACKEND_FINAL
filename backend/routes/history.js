const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Get user's history
router.get('/:userId', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { userId: req.params.userId };
    if (type && type !== 'all') {
      filter.type = type;
    }
    const history = await History.find(filter).sort({ createdAt: -1 }).limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to history
router.post('/:userId', async (req, res) => {
  try {
    const historyItem = new History({
      userId: req.params.userId,
      ...req.body
    });
    await historyItem.save();
    res.status(201).json(historyItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete history item
router.delete('/:id', async (req, res) => {
  try {
    await History.findByIdAndDelete(req.params.id);
    res.json({ message: 'History item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;