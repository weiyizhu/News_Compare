const express = require('express')
const router = express.Router();

// User Model
const User = require('../models/user')

// @route POST /users/signup
// @desc Check signup
// @access Public
router.post('/signup', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    newUser.save().then(item => res.json(item))
})

module.exports = router;