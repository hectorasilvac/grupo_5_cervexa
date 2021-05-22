const db = require('../../database/models');
const { Op } = db.Sequelize;

const Crud = ({dbName, dbModel}) => {
    const actions = {
        create: (req, res) => {
            dbModel.create(req.body)
            .then(result => {
                return res.status(200).json({
                    data: result,
                    status: 200,
                    created: 'ok'
                })
            })
            .catch(error => {
                return res.status(400).send(`Ha ocurrido un error al agregar nueva ${dbName}.`);
            });
        },
        delete: (req, res) => {
            const id = parseInt(req.params.id);
            dbModel.destroy({
                where: { id }
            })
            .then( () => {
                return res.status(200).json({
                    status: 200,
                    deleted: 'ok'
                });
            })
            .catch(error => {
                return res.status(400).send(`Ha ocurrido un error al eliminar ${dbName}.`);
            });
        },
        findAll: (req, res) => {
            dbModel.findAll()
                .then(result => {
                    return res.status(200).json({
                        total: result.length,
                        data: result,
                        status: 200
                    })
                })
                .catch(error => {
                    return res.status(400).send(`Ha ocurrido un error al recuperar ${dbName}.`);
                });
        },
        findByID: (req, res) => {
            const id = parseInt(req.params.id);
            dbModel.findByPk(id)
            .then(result => {
                return res.status(200).json({
                    data: result,
                    status: 200
                })
            })
            .catch(error => {
                return res.status(400).send(`Ha ocurrido un error al recuperar ${dbName} ${id}.`);
            });
        },
        update: (req, res) => {
            const id = parseInt(req.params.id);
            dbModel.update(req.body, {
                    where: { id }
                })
                .then( () => {
                    return res.status(200).json({
                        status: 200,
                        updated: 'ok'
                    });
                })
                .catch(error => {
                    return res.status(400).send(`Ha ocurrido un error al actualizar ${dbName}.`);
                });
        },
        search: (req, res) => {
            dbModel.findAll({
                where: {
                    name: { [Op.like]: '%' + req.query.keyword + '%' }
                }
            })
            .then(result => {
                return res.status(200).json({
                    total: result.length,
                    data: result,
                    status: 200
                });
            })
            .catch(error => {
                return res.status(400).send(`Ha ocurrido un error al buscar ${dbName}.`);
            });
        }
    }
    return actions;
}

module.exports = Crud;

