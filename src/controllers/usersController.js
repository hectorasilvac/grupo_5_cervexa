const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const Database = require('../models/Database');

const User = new Database('User');

const usersController = {
    register: (req, res) => {
        const title = 'Crear una cuenta';
        res.render('users/register', {
            'title': title
        });
    },
    processRegister: (req, res) => {
        const validation = validationResult(req);
        const title = 'Creación de Usuario | Cervexa';

        if (validation.errors.length > 0) {
            return res.render('users/register', {
                errors: validation.mapped(),
                oldData: req.body,
                title,
            });
        }

        const userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este correo ya está registrado.'
                    }
                },
                oldData: req.body,
                title
            });
        }

        const userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            profileImage: req.file.filename
        };
        
        delete userToCreate.acceptedTerms;
        const userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
    },
    login: (req, res) => {
        const title = 'Cuenta';
        res.render('users/login', {
            'title': title
        })
    },
    loginProcess: (req, res) => {
        const title = 'Cuenta | Cervexa';
        const formValidation = validationResult(req);
        const formHasErrors = formValidation.errors.length > 0;

        if (formHasErrors) {
            const formErrors = {
                errors: formValidation.mapped(),
                title
            };

            res.render('users/login', formErrors);
        }

        const userToLogin = User.findByField('email', req.body.email);
        const passwordIsValid = userToLogin 
            ? bcryptjs.compareSync(req?.body?.password, userToLogin?.password) 
            : false;

        if (userToLogin && passwordIsValid) {
            delete userToLogin.password;
            req.session.userLogged = userToLogin;

            if (req.body.rememberUser) {
                res.cookie('userEmail', req.body.email, { maxAge: ((1000 * 60) * 60) * 12, secure: false });
            }

            res.redirect('/users/profile');
        }

        const accessError = {
            errors: {
                email: {
                    msg: 'Las credenciales son inválidas'
                }
            },
            title
        };

        res.render('users/login', accessError);
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