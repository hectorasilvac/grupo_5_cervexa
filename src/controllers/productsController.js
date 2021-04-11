/* eslint-disable radix */
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../../database/models');
const { errorsExist, returnAMethod, showErrors } = require('../utilities');

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
        const id = parseInt(req.params.id);
        const includes = {
            include: ['measure', 'category', 'images', 'inventory']
        }

        db.Product.findByPk(id, includes)
            .then( product => {
                const title = product.name.charAt(0).toUpperCase() + product.name.slice(1);
                 res.render('products/details', {
                     title,
                     product
                });
            })
            .catch( error => {
                res.send('Producto no existe.');
            });
    },
    create: ({req, res, variables = null}) => {
        const getCategories = db.Category.findAll();
        const getMeasures = db.Measure.findAll();
        const getBrands = db.Brand.findAll();

        Promise.all([getCategories, getMeasures, getBrands])
            .then( ([categories, measures, brands]) => {
                const title = 'Creación de Producto';

                return res.render('products/edit', {
                    title,
                    categories,
                    measures,
                    brands,
                    ...variables
                })
            });
    },
    editById: (req, res) => {
        const id = parseInt(req.params.id);
        const includes = {
            include: ['measure', 'category', 'images', 'inventory']
        };

        db.Product.findByPk(id, includes)
            .then( product => {
                const title = 'Editar Producto';
                return productsController.create(req, res, {title, product});
            });
    },
    addRegister: (req, res) => {
        const validationParameters = {req, validationResult};
        const goToCreate = returnAMethod(productsController.create);
        const variablesToShow = showErrors(validationParameters);

        // Verify if the create form has errors
        const thereAreErrors = errorsExist(validationParameters);
        if (thereAreErrors) {
            const variables = variablesToShow();
            const loadMethod = goToCreate({req, res, variables});
            return loadMethod;
        }

        // If no errors have ocurred, then try to create the product
        const createImage = db.Image.create({
            url: req.file.filename,
            alt: 'Probando Imagen 13'
        });
        
        const createProduct = db.Product.create({
            name: req.body.name,
            description: req.body.description,
            content: req.body.content,
            measure: req.body.measure,
            category_id: req.body.category,
            measure_id: req.body.measure,
            brand_id: req.body.brand,
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
            .catch(error => {
                res.send('Ha ocurrido un error al agregar el regsitro.');
            });

        return res.redirect('/products/create');

    },
    save: (req, res) => {
        const { file } = req;
        const id = parseInt(req.params.id);
        const errorsExist = verifyErrors(req, validationResult);
        
        const setErrors = renderErrors(req, res, errorsExist);
        const setController = setErrors(productsController);
        const showErrors = setController({ product: { id } });

        if (errorsExist) {
            return showErrors;
        }

        db.Product.update(
            {
                name: req.body.name,
                description: req.body.description,
                content: req.body.content,
                measure_id: req.body.measure,
                brand_id: req.body.brand,
                category_id: req.body.category,
            },
            { where: { id } }
        )
        .then( product => {
            db.Inventory.update(
                {
                    expirationDate: req.body.expirationDate,
                    purchasePrice: req.body.purchasePrice,
                    salePrice: req.body.salePrice,
                    stock: req.body.stock
                },
                { where: { id: req.body.inventoryId } }
            )
        })
        .catch( error => {
            res.send('Ha ocurrido un error.');
        });

        return res.redirect(`/products/${id}`);
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
};

module.exports = productsController;