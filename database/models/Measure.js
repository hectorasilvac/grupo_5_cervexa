module.exports = (sequelize, DataTypes) => {
    const alias = 'Measure';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        value: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
    };
    const config = {
        timestamps: false
    };

    const Measure = sequelize.define(alias, cols, config);

    Measure.associate = models => {
        Measure.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'measure_id'
        });
    }

    return Measure;
}