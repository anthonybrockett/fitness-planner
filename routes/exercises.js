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

// Show Function
router.get('/exercises/:id', isLoggedIn, exercisesCtrl.show)

// Edit Function
router.get('/exercises/:id/edit', isLoggedIn, exercisesCtrl.edit)

// Delete Function
router.delete('/exercises/:id', isLoggedIn, exercisesCtrl.delete)

// Update Function
router.put('/exercises/:id', isLoggedIn, exercisesCtrl.update)



module.exports = router;