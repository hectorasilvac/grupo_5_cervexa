/* eslint-disable radix */
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../../database/models');
const { errorsExist, returnAMethod, showErrors, setImages } = require('../utilities');

const productsController = {
    delete: async (req, res) => {
        let id = parseInt(req.params.id);
        console.log("EJECUTANDO ELIMINAR");

        const deletedProduct = await db.Product.destroy({
            where: { id }
        });

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
                const goToCreate = returnAMethod(productsController.create);
                const variables = {title, product};
                const loadMethod = goToCreate({req, res, variables});
                return loadMethod;
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
            return goToCreate({req, res, variables});
        }

        // If no errors have ocurred, then try to create the product
        const createImage = db.Image.create({
            url: req.file.filename,
            alt: req.body.name,
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
    save: async (req, res) => {
        const id = parseInt(req.params.id);
        const newImage = req.file;
        const validationParameters = {req, validationResult};
        const goToCreate = returnAMethod(productsController.create);
        const variablesToShow = showErrors(validationParameters);

        // Verify if the edit form has errors
        const thereAreErrors = errorsExist(validationParameters);
        if (thereAreErrors) {
            const variables = variablesToShow({ product: { id } });
            const loadMethod = goToCreate({req, res, variables});
            return loadMethod;
        }

        // If no errors are found, proceed with the product update.
        try {
            const updatedProduct = await db.Product.update({
                name: req.body.name,
                description: req.body.description,
                content: req.body.content,
                measure_id: req.body.measure,
                brand_id: req.body.brand,
                category_id: req.body.category,
            }, {
                where: { id }
            });
        } catch (err) {
            throw new Error('Error al actualizar producto');
        }

        // If no errors are found, proceed with the inventory update.
        try {
            const updatedInventoy = await db.Inventory.update({
                expirationDate: req.body.expirationDate,
                purchasePrice: req.body.purchasePrice,
                salePrice: req.body.salePrice,
                stock: req.body.stock
            }, {
                where: { id: req.body.inventoryId }
            });
        } catch (error) {
            throw new Error('Error al actualizar el inventario.');
        }

        // If a new image has been uploaded, assign it to the product
        if(newImage !== undefined) {
            const createdImage = await db.Image.create({
                url: req.file.filename,
                alt: req.body.name,
            });

            const foundProduct = await db.Product.findByPk(id);
            setImages(foundProduct, createdImage.id);
        }
        
        return res.redirect(`/products/${id}`);
    },
    showAll: async (req, res) => {
        const includes = {
            include: ['brand', 'images', 'inventory', 'measure']
        };
        const getAllProducts = db.Product.findAll({...includes});
        const products = await getAllProducts;
        
        const title = 'Listado de Productos | Merkar';
        res.render('products/list', {
            title,
            products
        });
    },
};

module.exports = productsController;