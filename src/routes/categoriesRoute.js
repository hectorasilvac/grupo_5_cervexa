const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.findAll);
router.post('/', categoriesController.create);
router.get('/search', categoriesController.search);
router.get('/:id', categoriesController.findByID);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.delete);

module.exports = router;