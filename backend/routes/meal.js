const router = require("express").Router();
const Meal = require("../models/Meal");

router.get("/", async (req, res) => {
  const meal = await Meal.findOne();
  res.json(meal);
});

router.post("/", async (req, res) => {
  const meal = new Meal(req.body);
  await meal.save();
  res.json({ message: "Meal saved" });
});

module.exports = router;
