const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsPath = path.resolve(__dirname, '../data/products.json');

const productsController = {
	delete: (req, res) => {
		let id = parseInt(req.params.id);
		let products = fs.readFileSync(productsPath, 'utf-8');
		products = JSON.parse(products);

		const index = products.map((product) => product.id).indexOf(id);

		if (index > -1) {
			products.splice(index, 1);
		}

		let productsJSON = JSON.stringify(products);
		fs.writeFileSync(productsPath, productsJSON);

		res.redirect('/');
	},
	details: (req, res) => {
		let id = parseInt(req.params.id);

		let products = fs.readFileSync(productsPath, 'utf-8');
		products = JSON.parse(products);

		let product = products.find((product) => product.id === id);

		let title = product.name;
		res.render('products/details', {
			title: title,
			product: product,
		});
	},
	create: (req, res) => {
		let title = 'Creación de Producto';
		res.render('products/edit', {
			title: title,
		});
	},
	editById: (req, res) => {
		let title = 'Editar Producto';
		let id = parseInt(req.params.id);

		let products = fs.readFileSync(productsPath, 'utf-8');
		products = JSON.parse(products);

		let product = products.find((product) => product.id === id);

		if (product !== undefined) {
			res.render('products/edit', {
				title: title,
				product: product,
			});
		} else {
			res.send('Error');
		}
	},
	addRegister: (req, res, next) => {
		const validations = validationResult(req);
		const file = req.file;

		if (validations.errors.length > 0) {
			res.render('products/edit', {
				errors: validations.mapped(),
				oldData: req.body,
				title: 'Editar Producto | Cervexa',
			});
		}

		let product = {
			id: null,
			name: req.body.name,
			description: req.body.description,
			image: file.filename,
			category: req.body.category,
			price: req.body.price,
		};

		let productsFile = fs.readFileSync(productsPath, 'utf-8');
		let products;

		if (productsFile === '') {
			products = [];
		} else {
			products = JSON.parse(productsFile);
		}

		product.id = products.length + 1;
		products.push(product);
		productsJSON = JSON.stringify(products);
		fs.writeFileSync(productsPath, productsJSON);

		res.redirect('/');
	},
	save: (req, res) => {
		let id = parseInt(req.params.id);
		let productsFile = fs.readFileSync(productsPath, 'utf-8');
		let products = JSON.parse(productsFile);

		let product = products.find((product) => product.id === id);
		product.id = id;
		product.name = req.body.name;
		product.description = req.body.description;
		product.image = req.file.filename;
		product.category = req.body.category;
		product.price = req.body.price;

		let filteredProducts = products.filter((product) => product.id !== id);
		filteredProducts.push(product);
		let totalProducts = JSON.stringify(filteredProducts);
		fs.writeFileSync(productsPath, totalProducts);

		res.redirect('/');
	},
	showAll: (req, res) => {
		let products = fs.readFileSync(productsPath, 'utf-8');
		products = JSON.parse(products);

		let title = 'Listado de Productos | Merkar';
		res.render('products/list', {
			title: title,
			products: products,
		});
	},
};

module.exports = productsController;
