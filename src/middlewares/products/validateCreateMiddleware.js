const { body } = require('express-validator');
const path = require('path');

const validation = [
    body('name').notEmpty().withMessage('Tienes que escribir un nombre.'),
    body('description').notEmpty().withMessage('Tienes que escribir una descripción.'),
    body('content')
                .notEmpty().withMessage('Tienes que ingresar un contenido.').bail()
                .isNumeric().withMessage('El contenido debe ser númerico.'),
    body('measure').notEmpty().withMessage('Tienes que escribir una medida.'),
    body('category').notEmpty().withMessage('Tienes que escribir una categoría.'),
    body('stock')
                .notEmpty().withMessage('Tienes que escribir una cantidad de productos disponibles.').bail()
                .isNumeric().withMessage('El stock debe ser númerico.'),
    body('expirationDate')
                .notEmpty().withMessage('Tienes que escribir una fecha de vencimiento.').bail()
                .isDate({format: 'YYYY-MM-DD'}),
    body('purchasePrice')
                .notEmpty().withMessage('Tienes que escribir un precio de compra.').bail()
                .isNumeric().withMessage('El precio de compra debe ser númerico.'),
    body('salePrice')
                .notEmpty().withMessage('Tienes que escribir un precio de venta.').bail()
                .isNumeric().withMessage('El precio de venta debe ser númerico.'), 
    body('image').custom((value, { req }) => {
        const { file } = req;
        const acceptedExtensions = ['.jpg', '.png', '.gif', '.webp'];

        if( !file ) {
            throw new Error('Tienes que subir una imagen.');
        } else {
            const fileExtension = path.extname(file.originalname);
            if( !acceptedExtensions.includes(fileExtension) ) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validation;