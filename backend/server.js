const express = require("express");
const cors = require("cors");
require('dotenv').config();
require("./db");

const mealRoutes = require("./routes/meal");
const groceryRoutes = require("./routes/grocery");
const progressRoutes = require("./routes/progress");
const userRoutes = require("./routes/user");
const recipesRoutes = require("./routes/recipes");
const plansRoutes = require("./routes/plans");
const historyRoutes = require("./routes/history");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/meal", mealRoutes);
app.use("/api/grocery", groceryRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
