const bcryptjs = require('bcryptjs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../../database/models');
const { errorsExist, existsInDB, returnAMethod, showErrors } = require('../utilities');

const usersController = {
    create: ({req, res, variables = null}) => {
        const title = 'Crear una cuenta';
        res.render('users/register', {
            title,
            ...variables
        });
    },
    processRegister: async (req, res) => {
        const validationParameters = {req, validationResult};
        const goToCreate = returnAMethod(usersController.create);
        const variablesToShow = showErrors(validationParameters);

        // Verify if the create form has errors
        const thereAreErrors = errorsExist(validationParameters);
        if (thereAreErrors) {
            const variables = variablesToShow();
            return goToCreate({req, res, variables});
        }

        // Verify if the email exists in the database, if so, return an error
        const email = req.body.email.toLowerCase();
        const emailExists = await existsInDB({
            model: db.User,
            condition: { email }
        });

        if(emailExists) {
            const wrongEmail = {
                errors: {
                    email: { msg: 'El correo electrónico ya existe.'}
                }
            };
            const variables = variablesToShow(wrongEmail);
            return goToCreate({req, res, variables});
        }

        // If no errors have ocurred, then try to register the user

        const userToCreate = {
            first_name: req.body.firstName.toLowerCase(),
            last_name: req.body.lastName.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: bcryptjs.hashSync(req.body.password, 10),
            profile_image: req.body.profileImage.toLowerCase()
        };

        const createUser = await db.User.create(userToCreate);

        return createUser ? res.redirect('/users/login') : res.send('Ha ocurrido un error al registrarse.');
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
            const wrongEmail = {
                errors: {
                    email: { msg: 'El correo electrónico no es válido.'}
                }
            };
            const variables = variablesToShow(wrongEmail);
            return goToLogin({req, res, variables});
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

        // Store only non-sensitive user information
        const userInfo = {
            first_name: emailToLogin.first_name,
            last_name: emailToLogin.last_name,
            email: emailToLogin.email,
            profile_image: emailToLogin.profile_image,
            rank_id: emailToLogin.rank_id
        };

        // Establish a login session and assign user information to it
        req.session.userLogged = userInfo;

        // Check if the user wants to remember their information to log in automatically for the next 12 hours
        if(req.body.rememberUser) {
            res.cookie('userEmail', req.body.email, { maxAge: ((1000 * 60) * 60) * 12, secure: false });
        }
        
        return res.redirect('/users/profile');
    },
    profile: (req, res) => {
        const user = req?.session?.userLogged;
        const adminPermission = 1;

        // Verify if the user is an administrator and add that validation as a property
        if (user.rank_id === adminPermission) {
            user.adminPermission = true;
        } else {
            user.admninPermission = false;
        }

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