module.exports = (sequelize, DataTypes) => {
    const alias = 'Image';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: false
        },
    };
    const config = {
        timestamps: false
    };

    const Image = sequelize.define(alias, cols, config);
    Image.associate = models => {
        Image.belongsToMany(models.Product, {
            as: 'products',
            through: 'ProductImage',
            foreignKey: 'image_id',
            otherKey: 'product_id'
        });
    }
    return Image;
}