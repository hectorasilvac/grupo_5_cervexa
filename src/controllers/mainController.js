const path = require('path');
const mainController = {
    home: (req, res) => {
        let title = 'Licores a domicilios 24hs | Entrega en minutos';
        res.render('home', {
            'title': title
        });
    },
};

module.exports = mainController;