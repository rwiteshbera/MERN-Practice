const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = mongoose.model("userData");

dotenv.config({path: __dirname + "../"});

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const {_id} = payload;
    User.findById(id).then((userData) => {
        req.user = userData;
    })
    next();
  });
};
