var express = require("express");
var router = express.Router();

// Register page
router.get('/register', function (req, res){
    res.render("register");
});

// Login page
router.get('/login', function (req, res){
    res.render("login");
});

module.exports = router;