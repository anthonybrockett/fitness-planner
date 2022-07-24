const express = require('express');
const router = express.Router();
const workoutsCtrl = require('../controllers/workouts')
const isLoggedIn = require('../config/auth');

// Index Function
router.get('/workouts', workoutsCtrl.index)

// New Function
router.get('/workouts/new', isLoggedIn, workoutsCtrl.new)

// Create Function
router.post('/workouts', isLoggedIn, workoutsCtrl.create)

// Show Function
router.get('/workouts/:id', isLoggedIn, workoutsCtrl.show)

// Edit Function
router.get('/workouts/:id/edit', isLoggedIn, workoutsCtrl.edit)

// Delete Function
router.delete('/workouts/:id', isLoggedIn, workoutsCtrl.delete)

// Update Function
router.put('/workouts/:id', isLoggedIn, workoutsCtrl.update)

module.exports = router