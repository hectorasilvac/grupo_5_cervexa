const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.get('/items', cartController.items);

module.exports = router;