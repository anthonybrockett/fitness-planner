const express = require('express');
const router = express.Router();
const enotesCtrl = require('../controllers/enotes');

// Post
router.post('/exercises/:id/enotes', enotesCtrl.create);

// Delete
router.delete('/enotes/:id', enotesCtrl.delete);

module.exports = router;