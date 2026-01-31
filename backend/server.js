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
app.use(cors({
  origin: "https://dietpaln-frontend-final.onrender.com"
}));
app.use(express.json());

app.use("/api/meal", mealRoutes);
app.use("/api/grocery", groceryRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/
