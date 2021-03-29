const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../../database/models');

const productsPath = path.resolve(__dirname, '../data/products.json');

const productsController = {
    delete: (req, res) => {
        let id = parseInt(req.params.id);
        let products = fs.readFileSync(productsPath, 'utf-8');
        products = JSON.parse(products);

        const index = products.map( product => product.id ).indexOf(id);

        if ( index > -1 ) {
            products.splice(index, 1);
        }

        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsPath, productsJSON);

        res.redirect('/');
    },
    details: (req, res) => {
        let id = parseInt(req.params.id);

        if ( id !== undefined ) {

        let products = fs.readFileSync(productsPath, 'utf-8');
        products = JSON.parse(products);

        let product = products.find( product => product.id === id);

        let title = product?.name;
        res.render('products/details', {
            title: title,
            product: product
        });

    } else {
            console.log('No existe la ID')
        }
    },
    create: (req, res, next, variables = null) => {
        const getCategories = db.Category.findAll();
        const getMeasures = db.Measure.findAll();

        Promise.all([getCategories, getMeasures])
            .then( ([categories, measures]) => {
                const title = 'Creación de Producto';

                return res.render('products/edit', {
                    title,
                    categories,
                    measures,
                    ...variables
                })
            });
    },
    editById: (req, res) => {
        let title = 'Editar Producto';
        let id = parseInt(req.params.id);

        let products = fs.readFileSync(productsPath, 'utf-8');
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
        const validations = validationResult(req);
        const { file } = req;

        const formHasErrors = validations.errors.length > 0;
        if(formHasErrors) {
            return productsController.create(req, res, next, {
                errors: validations.mapped(),
                oldData: req.body,
            });
        }

        const createImage = db.Image.create({
            url: file.filename,
            alt: 'Probando Imagen 13'
        });

        const createProduct = db.Product.create({
            name: req.body.name,
            description: req.body.description,
            content: req.body.content,
            measure: req.body.measure,
            category_id: req.body.category,
            measure_id: req.body.measure,
            inventory: {
                expirationDate: req.body.expirationDate,
                purchasePrice: req.body.purchasePrice,
                salePrice: req.body.salePrice,
                stock: req.body.stock
            }
        },
        {
            include: ['inventory']
        });

        Promise.all([createProduct, createImage])
            .then(([product, image]) => {
                db.Product.findByPk(product.id)
                    .then(productFound => {
                        productFound.setImages([image.id])
                    });
            })
            .catch( error => {
                console.log(error);
            });

        return res.redirect('/products/create');
    },
    save: (req, res) => {
        let id = parseInt(req.params.id);
        let productsFile = fs.readFileSync(productsPath, 'utf-8');
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
        fs.writeFileSync(productsPath, totalProducts);

        res.redirect('/');
    },
    showAll:(req,res) => {
        let products = fs.readFileSync(productsPath, 'utf-8');
        products = JSON.parse(products);
        
        let title = 'Listado de Productos | Merkar';
        res.render('products/list', {
            title: title,
            products: products
        });
    },
    test: (req, res) => {
        // db.Product.findByPk(1, {
        //     include: ['brand']
        // })
        // .then( product => {
        //     console.log(product.brand.name);
        // });
        // res.send('Funcionando');
    },
};

module.exports = productsController;