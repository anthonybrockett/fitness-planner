const express = require('express');
const router = express.Router();
const workoutsCtrl = require('../controllers/workouts')

// Index Function
router.get('/workouts', workoutsCtrl.index)

// New Function
router.get('/workouts/new', workoutsCtrl.new)

module.exports = router