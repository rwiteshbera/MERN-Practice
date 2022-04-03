const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("userData");
const bcrypt = require("bcryptjs"); // Encrypt Password
const jwt = require('jsonwebtoken');
const requireLogin = require("../middleware/requireLogin");


const JWT_SECRET = process.env.JWT_SECRET;

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/protected", requireLogin, (req, res) => {
    res.send("HELLO");
}) 

// User Registration 
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({error: "Please add all the fields"});
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json("User already exists with this email.");
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "Registered Successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Sign In Routes
router.post("/signin", (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(422).json({error: "Please add all the fields"});
    }

    User.findOne({email: email})
    .then((savedUser) => {
        if(!savedUser) {
            res.status(422).json({error: "Please provide correct information."});
        }

        bcrypt.compare(password, savedUser.password)
        .then((doMatch) => {
            if(doMatch) {
                // res.json({message : "Successfully Signed in"});
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
                res.json({token});
            } else {
                res.status(422).json({error: "Please provide correct information."})
            }
        }).catch((err) => {
            console.log(err)
        })
    })
})


module.exports = router;
