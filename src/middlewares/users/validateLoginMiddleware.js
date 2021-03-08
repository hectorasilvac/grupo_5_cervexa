const path = require('path');
const { body } = require('express-validator');

const validation = [
    body('email')
        .notEmpty().withMessage('El correo electrónico no puede estar vacío.').bail()
        .isEmail().withMessage('El correo electrónico no es válido.'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede estar vacía.'),
];

module.exports = validation;