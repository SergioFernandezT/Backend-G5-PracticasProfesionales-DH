module.exports = (sequelize, DataTypes) => {
    let alias = "Aspirante"
    let cols = {
        nombre: {
            type: DataTypes.STRING
        },
        apellido: {
            type: DataTypes.STRING
        },
    }
    let config = {
        tableName: 'aspirantes',
        timestamps: false,
    }

    const Aspirante = sequelize.define(alias, cols, config);

    Aspirante.associate = (models) => {
        Aspirante.belongsTo(models.Profesion, { as: 'profesiones', foreignKey: 'profesiones_id' })
    }

    return Aspirante;
}