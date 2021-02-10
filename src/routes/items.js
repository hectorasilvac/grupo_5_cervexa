const express = require('express');
const itemsController = require('../controllers/itemsController');

const router = express.Router();
router.get('/details', itemsController.details);

module.exports = router;