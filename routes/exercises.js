const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../controllers/exercises');
const isLoggedIn = require('../config/auth');

// Index Function
router.get('/exercises', exercisesCtrl.index)

// New Function
router.get('/exercises/new', isLoggedIn, exercisesCtrl.new)

// Create Function
router.post('/exercises', isLoggedIn, exercisesCtrl.create)


module.exports = router;