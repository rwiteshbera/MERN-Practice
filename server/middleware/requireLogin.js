const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = mongoose.model("userData");

dotenv.config({path: __dirname + "../"});
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer", "");
  jwt.verify(token,JWT_SECRET, (err, payload) => {
    if (err) {
      // return res.status(401).json({ error: "You must be logged in" });
      return res.send(err);
    }

    const {_id} = payload;
    User.findById(_id).then((userData) => {
        req.user = userData;
        next();
    })
  });
};
