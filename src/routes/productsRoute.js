const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const createValidation = require('../middlewares/products/validateCreateMiddleware');
const upload = require('../middlewares/products/uploadImageMiddleware');
const userLogged = require('../middlewares/users/userLoggedMiddleware');
const adminMiddleware = require('../middlewares/users/adminMiddleware');

router.get('/', adminMiddleware, productsController.showAll);
router.get('/create', adminMiddleware, productsController.create);
router.get('/:id', userLogged, productsController.details);
router.get('/:id/edit', productsController.editById);
router.delete('/:id', adminMiddleware, productsController.delete);
router.post('/', upload.single('image'), createValidation, productsController.addRegister);
/* Save updated product information */
router.put('/:id', upload.single('image'), createValidation, productsController.save);

module.exports = router;