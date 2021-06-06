const express = require("express");
const router = express.Router();

// User Model
const User = require("../models/user");

// @route POST /users/signup
// @desc User Sign up
// @access Public
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  // security https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
  try {
    let user = await User.findOne({
      email,
    });
    if (user)
      res.status(400).json({
        msg: "User Already Exists",
      });

    user = new User({
      email,
      password,
    });

    const response = await user.save();
    res.json(response);
  } catch (err) {
    res.status(500).json({
      msg: "Error saving user",
    });
  }
});

// @route POST /users/login
// @desc User log in
// @access Public
router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    let user = await User.findOne({
      email
    });
    if (!user || user.password !== password)
      res.status(400).json({ msg: "Incorrect account" });

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
