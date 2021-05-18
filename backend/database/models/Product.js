module.exports = (sequelize, DataTypes) => {
    const alias = 'Product';
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
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
    };
    const config = {
        timestamps: false,
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = models => {
        Product.belongsTo(models.Inventory, {
            as: 'inventory',
            foreignKey: 'inventory_id'
        });

        Product.belongsTo(models.Measure, {
            as: 'measure',
            foreignKey: 'measure_id'
        });

        Product.belongsTo(models.Brand, {
            as: 'brand',
            foreignKey: 'brand_id'
        });

        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });

        Product.belongsToMany(models.Image, {
            as: 'images',
            through: 'ProductImage',
            foreignKey: 'product_id',
            otherKey: 'image_id'
        });
    }

    return Product;
}