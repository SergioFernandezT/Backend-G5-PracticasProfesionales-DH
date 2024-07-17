module.exports = (sequelize, DataTypes) => {

    let alias = 'Profesion'
    let cols = {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profesion: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }
    let config =
    {
        tableName: 'profesiones',
        timestamps: false
    }

    const Profesion = sequelize.define(alias, cols, config)
    Profesion.associate = models => {
        Profesion.hasMany(models.Aspirante, {
            as: 'aspirantes_de_profesion',
            foreignKey: 'profesion_id'
        });
    };

    return Profesion;
};

