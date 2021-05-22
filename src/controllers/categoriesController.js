const crud =  require('../utilities/crud');
const db = require('../../database/models');

const categoriesController = crud({
    dbName: 'Category',
    dbModel: db.Category
});

module.exports = categoriesController;