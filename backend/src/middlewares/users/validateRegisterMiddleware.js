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
    body('acceptedTerms').custom((value, { req }) => {
        const { acceptedTerms } = req.body;
        // Verify if the form requires the user to accept the terms and conditions
        // If so, check if they have been accepted
        if (acceptedTerms !== undefined && acceptedTerms !== 'yes') {
                throw new Error('Debes confirmar que has leído  los términos y condiciones.');
        }
        return true;
    })
];

module.exports = validation;