const fs = require('fs');
const path = require('path');

const productsController = {
    details: (req, res) => {
        let id = parseInt(req.params.id);

        let products = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8');
        products = JSON.parse(products);

        let product = products.find( product => product.id === id);

        let title = product.name;
        res.render('products/details', {
            title: title,
            product: product
        });
    },
    edit: (req, res) => {
        let title = 'Creación de Producto';
        res.render('products/edit', {
            title: title,
            product: null
        });
    },
    editById: (req, res) => {
        let title = 'Editar Producto';
        let id = parseInt(req.params.id);

        let products = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8');
        products = JSON.parse(products);

        let product = products.find( product => product.id === id);

        if (product !== undefined) {
            res.render('products/edit', {
                title: title,
                product: product
            });
        } else {
            res.send('Error');
        }
    },
    addRegister: (req, res, next) => {
        const file = req.file;
        if( !file ) {
            const error = new Error('Por favor seleccione un archivo.');
            error.httpStatusCode = 400;
            return next(error);
        }

        let product = {
            id: null,
            name: req.body.name,
            description: req.body.description,
            image: file.filename,
            category: req.body.category,
            price: req.body.price
        };

        let productsFile = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8');
        let products;

        if (productsFile === "") {
            products = [];
        } else {
            products = JSON.parse(productsFile);
        }

        product.id = products.length;
        products.push(product);
        productsJSON = JSON.stringify(products);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), productsJSON);

        res.redirect('/');
    },
    save: (req, res) => {
        let id = parseInt(req.params.id);
        let productsFile = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8');
        let products = JSON.parse(productsFile);

        let product = products.find( product => product.id === id );
        product.id = id;
        product.name = req.body.name;
        product.description = req.body.description;
        product.image = req.file.filename;
        product.category = req.body.category;
        product.price = req.body.price;

        let filteredProducts = products.filter( product => product.id !== id );
        filteredProducts.push(product);
        let totalProducts = JSON.stringify(filteredProducts);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), totalProducts);

        res.redirect('/');
    }
};

module.exports = productsController;