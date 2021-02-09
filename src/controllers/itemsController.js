const path = require('path');
let productsController = {
    details: (req, res) => {
        let title = 'Descripcion del producto';
        res.render('items/details',{
            'title': title
        })
    },
}

module.exports = productsController;