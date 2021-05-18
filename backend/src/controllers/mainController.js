const path = require('path');
const fs = require('fs');
const db = require('../../database/models');

const mainController = {
    home: (req, res) => {
        db.Product.findAll({
                include: ['brand', 'images', 'inventory', 'measure']
            })
            .then(products => {
                const title = 'Listado de Productos | Merkar';
                res.render('home', {
                    title,
                    products
                });
            });
    }
};

module.exports = mainController;