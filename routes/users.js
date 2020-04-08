const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Users Login Route
router.get('/users/login', (req, res) => {
  res.send('login');

});

//Register
router.get('/users/register', (req, res) => {
  res.send('register');
});


module.exports = router;