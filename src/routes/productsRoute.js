const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

router.get('/edit', productsController.edit);
router.get('/edit/:id', productsController.editById);
router.put('/edit/:id/save', productsController.save);

router.post('/create', productsController.addRegister);
router.get('/info/:id', productsController.details);

module.exports = router;