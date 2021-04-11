module.exports = (sequelize, DataTypes) => {
    const alias = 'User';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        profile_image: {
            type: DataTypes.STRING(255),
            // allowNull: false
        },
    };
    const config = {
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = models => {
        User.belongsTo(models.Rank, {
            as: 'rank',
            foreignKey: 'rank_id'
        });
    }

    return User;
}