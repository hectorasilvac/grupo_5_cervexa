module.exports = (sequelize, DataTypes) => {
    const alias = 'ProductImage';
    const cols = {
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        image_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Image',
                key: 'id'
            }
        }
    };
    const config = {
        timestamps: false
    }

    const ProductImage = sequelize.define(alias, cols, config);

    ProductImage.associate = models => {
        ProductImage.belongsTo(models.Product, {
            foreignKey: 'product_id'
        });

        ProductImage.belongsTo(models.Image, {
            foreignKey: 'image_id'
        });
    }

    return ProductImage;
}