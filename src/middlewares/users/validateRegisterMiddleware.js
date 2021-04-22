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
    body('profileImage')
        .notEmpty().withMessage('La URL de Imagen de Perfil no puede estar vacía.').bail()
        .isURL().withMessage('Debes ingresar una URL válida.'),
    body('email')
        .notEmpty().withMessage('El apellido no puede estar vacío.').bail()
        .isEmail().withMessage('El correo electrónico no es válido.'),
    body('acceptedTerms')
        .notEmpty().withMessage('Debes confirmar que has leído  los términos y condiciones.'),
];

module.exports = validation;