const path = require('path');
let productsController = {
    show: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/items/details.html'));
    },
}

module.exports = productsController;