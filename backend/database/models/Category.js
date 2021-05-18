module.exports = (sequelize, DataTypes) => {
    const alias = 'Category';
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

    const Category = sequelize.define(alias, cols, config);

    Category.associate = models => {
        Category.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'category_id'
        });
    }

    return Category;
}