const express = require('express');
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController');
const router = express.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        const newFilename = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

let upload = multer({ storage });

router.get('/', productsController.showAll);
router.get('/create', productsController.create);
router.get('/:id', productsController.details);
router.get('/:id/edit', productsController.editById);

router.delete('/:id', productsController.delete);

router.post('/', upload.single('image'), productsController.addRegister);

router.put('/:id', upload.single('image'), productsController.save);


module.exports = router;