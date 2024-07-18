const bcrypt = require('bcrypt');

module.exports = (sequelize, dataTypes) => {
    let alias = 'Aspirante';
    let cols = {
        Nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Apellido: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        Dni: {
            type: dataTypes.INTEGER(15),
            allowNull: false,
            unique: true
        },
        Email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Telefono: {
            type: dataTypes.INTEGER(15),
            allowNull: false
        },
        Perfil_linkedin: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Fecha_nacimiento: {
            type: dataTypes.DATE,
            allowNull: false
        },
        Sexo: {
            type: dataTypes.ENUM('masculino', 'femenino'),
            allowNull: false
        },
        Imagen: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        // profesion_id:{
        //     type: dataTypes.STRING(200),
        //     allowNull: false
        // }
    };
    let config = {
        timestamps: false,
        tableName: 'aspirantes',
        deletedAt: false
    }

    const Aspirante = sequelize.define(alias, cols, config);

    Aspirante.associate = models => {
        Aspirante.belongsTo(models.Profesion, {
            as: "profesiones_de_aspirante",
            foreignKey: "profesion_id"
        });
    }

    return Aspirante;
};