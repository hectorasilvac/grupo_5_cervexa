const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const user = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
	addRegister: (req, res) => {
		if (req.file) {
			let { id, nombre, apellidos, password, terminos, correo } = req.body;
			let image = req.file.filename;

			let user = {
				id: null,
				nombre,
				apellidos,
				password,
				terminos,
				image,
				correo,
			};

			let usersFile = fs.readFileSync(usersFilePath, 'utf-8');
			let users;

			if (usersFile === '') {
				users = [];
			} else {
				users = JSON.parse(usersFile);
			}

			user.id = users.pop + 1;
			users.push(user);
			usersJSON = JSON.stringify(users);
			fs.writeFileSync(usersFilePath, usersJSON);

			res.redirect('/');
		} else {
			let title = 'Registro de usuarios';
			res.render('users/register', {
				title: title,
			});
		}
	},
	login: (req, res) => {
		let title = 'Ingresa a tu cuenta';
		res.render('users/login', {
			title: title,
		});
	},
	register: (req, res) => {
		let title = 'Registro de usuarios';
		res.render('users/register', {
			title: title,
		});
	},
	allUsers: (req, res) => {
		let title = 'Listado de usuarios';
		res.render('users/allUsers', {
			title: title,
			user: user,
		});
	},
};

module.exports = usersController;
