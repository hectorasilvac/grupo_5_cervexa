const path = require('path');
const cartController = {
    items: (req, res) => {
        let title = 'Carrito de Compras';
        res.render('cart/items', {
            'title': title
        });
    }
};

module.exports = cartController;