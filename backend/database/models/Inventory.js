module.exports = (sequelize, DataTypes) => {
    const alias = 'Inventory';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        purchasePrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        salePrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stock: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    };
    const config = {
        timestamps: false,
    };

    const Inventory = sequelize.define(alias, cols, config);

    Inventory.associate = models => {
        Inventory.hasOne(models.Product, {
            as: 'products',
            foreignKey: 'inventory_id'
        });
    }

    return Inventory;
}