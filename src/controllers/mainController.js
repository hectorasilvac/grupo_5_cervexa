const path = require('path');
const fs = require('fs');

const mainController = {
    home: (req, res) => {

        let products = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8');
        products = JSON.parse(products);

        let title = 'Licores a domicilios 24hs | Entrega en minutos';
        res.render('home', {
            title: title,
            products: products
        });
    },
};

module.exports = mainController;