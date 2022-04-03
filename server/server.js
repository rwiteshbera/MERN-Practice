const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;


// Connect to Database - MongoDB
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


require("./models/user"); // Database Schema
require("./models/post"); // Post Schema

app.use(express.json());
app.use(require("./routes/auth")); 
app.use(require("./routes/post")); 

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})