const path = require('path');
const { body } = require('express-validator');

const validation = [
    body('firstName')
        .notEmpty().withMessage('El nombre no puede estar vacío.').bail()
        .isAlpha().withMessage('El nombre solo debe contener letras.'),
    body('lastName')
        .notEmpty().withMessage('El apellido no puede estar vacío.').bail()
        .isAlpha().withMessage('El apellido solo debe contener letras.'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede estar vacía.'),
    body('email')
        .notEmpty().withMessage('El apellido no puede estar vacío.').bail()
        .isEmail().withMessage('El correo electrónico no es válido.'),
    body('acceptedTerms')
        .notEmpty().withMessage('Debes confirmar que has leído  los términos y condiciones.'),
    body('profileImage').custom((value, { req }) => {
        const { file } = req;
        const acceptedExtensions = ['.jpg', '.webp', '.png', '.gif'];

        if ( !file ) {
            throw new Error('Tienes que subir una imagen.');
        } else {
           const fileExtension = path.extname(file.originalname);
           if ( !acceptedExtensions.includes(fileExtension) ) {
               throw new Error(`Solo se permiten los formatos ${acceptedExtensions.join(', ')}`);
           }
        }
        return true;
    })
];

module.exports = validation;