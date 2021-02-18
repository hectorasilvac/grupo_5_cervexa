const path = require('path');

const usersController = {
    addRegister: (req, res) => {
        let user = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            image: '',
        };
        
        console.log(req.body);
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