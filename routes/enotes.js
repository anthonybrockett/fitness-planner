const express = require('express');
const router = express.Router();
const enotesCtrl = require('../controllers/enotes');
const isLoggedIn = require('../config/auth');

// Post
router.post('/exercises/:id/enotes', isLoggedIn, enotesCtrl.create);

// Delete
router.delete('/enotes/:id', isLoggedIn, enotesCtrl.delete);

module.exports = router;