const express = require('express');
const itemsController = require('../controllers/itemsController');

const router = express.Router();
router.get('/:id', itemsController.show);
module.exports = router;