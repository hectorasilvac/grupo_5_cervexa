module.exports = (sequelize, DataTypes) => {
    const alias = 'Brand';
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
    };
    const config = {
        timestamps: false
    };

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = models => {
        Brand.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'brand_id'
        });
    }

    return Brand;
}