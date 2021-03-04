const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const Database = require('../models/Database');

const User = new Database('User');

const usersController = {
    addRegister: (req, res) => {
        const validation = validationResult(req);
        const title = 'Creación de Usuario | Cervexa';
        res.render('users/register', {
            title,
            errors: validation.mapped(),
            oldData: req.body
        });

        console.log('Prueba');

        // if (req.file) {
        //     let usersFilePath = path.resolve(__dirname, '../data/users.json');

        //     let {
        //         id,
        //         nombre,
        //         apellidos,
        //         password,
        //         terminos,
        //         correo
        //     } = req.body;
        //     let image = req.file.filename;

        //     let user = {
        //         id: null,
        //         nombre,
        //         apellidos,
        //         password,
        //         terminos,
        //         image,
        //         correo
        //     };

        //     let usersFile = fs.readFileSync(usersFilePath, 'utf-8');
        //     let users;

        //     if (usersFile === '') {
        //         users = [];
        //     } else {
        //         users = JSON.parse(usersFile);
        //     }

        //     user.id = users.length + 1;
        //     users.push(user);
        //     usersJSON = JSON.stringify(users);
        //     fs.writeFileSync(usersFilePath, usersJSON);

        //     res.redirect('/');
        // } else {
        //     let title = 'Registro de usuarios';
        //     res.render('users/register', {
        //         'title': title
        //     });
        // }

    },
    login: (req, res) => {
        let title = 'Ingresa a tu cuenta';
        res.render('users/login', {
            'title': title
        })
    },
    register: (req, res) => {
        let title = 'Registro de usuarios';
        res.render('users/register', {
            'title': title
        });
    },
    processLogin: (req, res) => {

    }
};

module.exports = usersController;