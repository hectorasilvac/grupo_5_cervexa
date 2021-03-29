const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const createValidation = require('../middlewares/products/validateCreateMiddleware');
const upload = require('../middlewares/products/uploadImageMiddleware');

router.get('/traer', productsController.test);

router.get('/', productsController.showAll);
router.get('/create', productsController.create);
router.get('/:id', productsController.details);
router.get('/:id/edit', productsController.editById);

router.delete('/:id', productsController.delete);

router.post('/', upload.single('image'), createValidation, productsController.addRegister);
router.put('/:id', upload.single('image'), createValidation, productsController.save);


module.exports = router;