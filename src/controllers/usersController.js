const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const Database = require('../models/Database');

const User = new Database('User');

const usersController = {
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
        
        const userCreated = User.create(userToCreate);
        return res.redirect('/users/login');
    },
    login: (req, res) => {
        let title = 'Ingresa a tu cuenta';
        res.render('users/login', {
            'title': title
        })
    },
    register: (req, res) => {
        let title = 'Crear una cuenta';
        res.render('users/register', {
            'title': title
        });
    },
    processLogin: (req, res) => {

    }
};

module.exports = usersController;