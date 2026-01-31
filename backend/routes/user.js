const router = require("express").Router();
const User = require('../models/User');

router.get("/", (req, res) => {
  res.json({
    email: "suji2006@gmail.com",
    plan: "PREMIER"
  });
});

// Create new user
router.post("/", async (req, res) => {
  try {
    console.log('Creating user:', req.body);
    const { name, email, password, goal } = req.body;
    const user = new User({ name, email, password, goal });
    const savedUser = await user.save();
    console.log('User saved:', savedUser);
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ _id: user._id, name: user.name, email: user.email, goal: user.goal });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
