const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    dairy: ["Eggs – 4"],
    oils: ["Olive Oil – 22.5g"],
    legumes: ["Lentils – 200g"]
  });
});

module.exports = router;
