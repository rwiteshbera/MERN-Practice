const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

require("./models/user"); // Database Schema

app.use(express.json());
app.use(require("./routes/auth")); // Express Router

// Connect to Database
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Failed to connect with Database: " + err);
  });


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})