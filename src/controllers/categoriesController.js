// const db = require('../../database/models');

// const { Op } = db.Sequelize;

// const categoriesController = {
//     create: (req, res) => {
//         db.Category.create(req.body)
//         .then(category => {
//             return res.status(200).json({
//                 data: category,
//                 status: 200,
//                 created: 'ok'
//             })
//         })
//         .catch(error => {
//             return res.status(400).send('Ha ocurrido un error al agregar nueva categoría.');
//         });
//     },
//     delete: (req, res) => {
//         const id = parseInt(req.params.id);
//         db.Category.destroy({
//             where: { id }
//         })
//         .then( () => {
//             return res.status(200).json({
//                 status: 200,
//                 deleted: 'ok'
//             });
//         })
//         .catch(error => {
//             return res.status(400).send('Ha ocurrido un error al eliminar categoría.');
//         });
//     },
//     findAll: (req, res) => {
//         db.Category.findAll()
//             .then(categories => {
//                 return res.status(200).json({
//                     total: categories.length,
//                     data: categories,
//                     status: 200
//                 })
//             })
//             .catch(error => {
//                 return res.status(400).send('Ha ocurrido un error al recuperar las categorías.');
//             });
//     },
//     findByID: (req, res) => {
//         const id = parseInt(req.params.id);
//         db.Category.findByPk(id)
//         .then(category => {
//             return res.status(200).json({
//                 data: category,
//                 status: 200
//             })
//         })
//         .catch(error => {
//             return res.status(400).send(`Ha ocurrido un error al recuperar la categoría ${id}.`);
//         });
//     },
//     update: (req, res) => {
//         const id = parseInt(req.params.id);
//         db.Category.update(req.body, {
//                 where: { id }
//             })
//             .then( () => {
//                 return res.status(200).json({
//                     status: 200,
//                     updated: 'ok'
//                 });
//             })
//             .catch(error => {
//                 return res.status(400).send('Ha ocurrido un error al actualizar categoría.');
//             });
//     },
//     search: (req, res) => {
//         db.Category.findAll({
//             where: {
//                 name: { [Op.like]: '%' + req.query.keyword + '%' }
//             }
//         })
//         .then(categories => {
//             return res.status(200).json({
//                 total: categories.length,
//                 data: categories,
//                 status: 200
//             });
//         })
//         .catch(error => {
//             return res.status(400).send('Ha ocurrido un error al buscar categoría.');
//         });
//     }
// }

// module.exports = categoriesController;