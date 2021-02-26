const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const productsController = require('../controllers/productsController');

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

const validations = [
    body('name').notEmpty().withMessage('Tienes que escribir un nombre.'),
    body('description').notEmpty().withMessage('Tienes que escribir una descripción.'),
    body('category').notEmpty().withMessage('Tienes que escribir una categoría.'),
    body('price')
                .notEmpty().withMessage('Tienes que escribir un precio.').bail()
                .isNumeric().withMessage('El precio debe ser númerico.'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.webp'];

        if( !file ) {
            throw new Error('Tienes que subir una imagen.');
        } else {
            let fileExtension = path.extname(file.originalname);
            if( !acceptedExtensions.includes(fileExtension) ) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

router.get('/', productsController.showAll);
router.get('/create', productsController.create);
router.get('/:id', productsController.details);
router.get('/:id/edit', productsController.editById);

router.delete('/:id', productsController.delete);

router.post('/', upload.single('image'), validations, productsController.addRegister);
router.put('/:id', upload.single('image'), validations, productsController.save);


module.exports = router;