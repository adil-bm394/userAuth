const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");
const User = require("./models/UserModel");
const db = require("./models/index");


dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());


//Register || login
app.use("/api/v1/auth", require("./routes/authRoutes"));


const sequelize = require("./config/database");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`Databse synced`.bgGreen.white);
  })
  .catch((err) => {
    console.error(`unable to sync database`, err);
  });

// Routes
app.get("/", async (req, res) => {
  try {
    res.send("Hello");
  } catch (error) {
    res.status(500).send(error.message);
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`.bgGreen.white);
});
