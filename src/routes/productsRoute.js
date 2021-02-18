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

router.get('/edit', productsController.edit);
router.get('/edit/:id', productsController.editById);
router.put('/edit/:id/save', upload.single('image'), productsController.save);

router.post('/create', upload.single('image'), productsController.addRegister);
router.get('/info/:id', productsController.details);

module.exports = router;