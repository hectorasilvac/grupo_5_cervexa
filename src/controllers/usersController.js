const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const Database = require('../models/Database');
const db = require('../../database/models');
const { errorsExist, existsInDB, returnAMethod, showErrors } = require('../utilities');

const User = new Database('User');

const usersController = {
    create: ({req, res, variables = null}) => {
        const title = 'Crear una cuenta';
        res.render('users/register', {
            title,
            ...variables
        });
    },
    processRegister: (req, res) => {
        const errorsExist = verifyErrors(req, validationResult);
        const setErrors = renderErrors(req, res, errorsExist);
        const setController = setErrors(usersController);
        
        if (errorsExist) {
            const showErrors = setController();
            return showErrors;
        }

        const email = req.body.email.toLowerCase();

        db.User.findOne({
            where: {
                email
            }
        }).then( result => {
            if (result) {
                const showErrors = setController({
                    errors: {
                        email: {
                            msg: 'Este correo ya está registrado.'
                        }
                    },
                });
                return showErrors;
            }
        });

        console.log(req.body);

        const userToCreate = {
            first_name: req.body.firstName.toLowerCase(),
            last_name: req.body.lastName.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: bcryptjs.hashSync(req.body.password, 10),
            // profileImage: req.file.filename
        };

        db.User.create(userToCreate)
        .then( result => {
            res.redirect('/users/login');
        });
    },
    login: ({req, res, variables = null}) => {
        const title = 'Cuenta';
        res.render('users/login', {
            title,
            ...variables
        })
    },
    loginProcess: async (req, res) => {
        const validationParameters = {req, validationResult};
        const goToLogin = returnAMethod(usersController.login);
        const variablesToShow = showErrors(validationParameters);

        // Verify if the login form has errors
        const thereAreErrors = errorsExist(validationParameters);
        if (thereAreErrors) {
            const variables = variablesToShow();
            const loadMethod = goToLogin({req, res, variables});
            return loadMethod;
        }

        // Check the existence of the e-mail in the database
        const emailToLogin = await existsInDB({
            model: db.User,
            condition: { email: req.body.email }
        });

        if(!emailToLogin) {
            const noEmail = {
                errors: {
                    email: { msg: 'El correo electrónico no es válido.'}
                }
            };
            const variables = variablesToShow(noEmail);
            const loadMethod = goToLogin({req, res, variables});
            return loadMethod;
        }

        // Check that the password is correct
        const passwordIsValid = bcryptjs.compareSync(req.body.password, emailToLogin.password);
        
        if(!passwordIsValid) {
            const noEmail = {
                errors: {
                    password: { msg: 'La contraseña es incorrecta.'}
                }
            };
            const variables = variablesToShow(noEmail);
            const loadMethod = goToLogin({req, res, variables});
            return loadMethod;
        }

        // Save user information and allow access
        delete emailToLogin.password;
        req.session.userLogged = emailToLogin;

        if(req.body.rememberUser) {
            res.cookie('userEmail', req.body.email, { maxAge: ((1000 * 60) * 60) * 12, secure: false });
        }
        
        return res.redirect('/users/profile');
    },
    profile: (req, res) => {
        const user = req.session.userLogged;
        const title = 'Perfil | Cervexa';
        res.render('users/profile', {user, title})
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = usersController;