const fs = require('fs');
const path = require('path');

const usersController = {
    addRegister: (req, res) => {
        let usersFilePath =  path.resolve(__dirname, '../data/users.json');

        let {id, firstName, lastName, password, image } = req.body;

        let user = {
            id: null,
            firstName,
            lastName,
            password,
            image
        };

        let usersFile = fs.readFileSync(usersFilePath, 'utf-8');
        let users;

        if ( usersFile === '' ) {
            users = [];
        } else {
            users = JSON.parse(usersFile);
        }

        user.id = users.length + 1;
        users.push(user);
        usersJSON = JSON.stringify(users);
        fs.writeFileSync(usersFilePath, usersJSON);

        res.redirect('/');
    },
    login: (req, res) => {
        let title = 'Ingresa a tu cuenta';
        res.render('users/login',{
            'title': title
        })
    },
    register: (req, res) => {
        let title = 'Registro de usuarios';
        res.render('users/register',{
            'title': title
        });
    }
};

module.exports = usersController;