module.exports = (sequelize, DataTypes) => {
    const alias = 'Rank';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
    };
    const config = {
        timestamps: false
    };

    const Rank = sequelize.define(alias, cols, config);

    Rank.associate = models => {
        Rank.hasMany(models.User, {
            as: 'user',
            foreignKey: 'rank_id'
        });
    }
    
    return Rank;
}