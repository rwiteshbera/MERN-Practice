const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin"); // Check whether the user is logged in or not
const Post = mongoose.model("POST");

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res
      .status(422)
      .json({ error: "Please fill all the necessary fields to post." });
  }

  req.user.password = undefined;

  const post = new Post({
      title,
      body,
      postedby: req.user
  })
  post.save()
  .then((result) => {
      res.json({Post: req.user})
  })
  .catch((e) => {
      console.log(e);
  })
});

module.exports = router;
