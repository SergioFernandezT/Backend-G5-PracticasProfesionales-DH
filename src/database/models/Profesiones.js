module.exports = (sequelize, DataTypes) => {
    let alias = "Profesion"
    let cols = {
        name: {
            type: DataTypes.STRING
        },
    }
    let config = {
        tableName: 'profesiones',
        timestamps: false,
    }

    const Profesion = sequelize.define(alias, cols, config);

    Profesion.associate = (models) => {
        Profesion.hasMany(models.Aspirante,{ as : 'aspirantes', foreignKey : 'profesiones_id'  })
    }

    return Profesion;
}