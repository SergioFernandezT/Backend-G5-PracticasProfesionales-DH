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
        Dni: {
            type: dataTypes.INTEGER(15),
            allowNull: false,
            unique: true
        },
        Email:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Telefono:{
            type: dataTypes.INTEGER(15),
            allowNull: false
        },
        Perfil_linkedin:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Fecha_nacimiento:{
            type: dataTypes.DATE,
            allowNull: false
        },
        Sexo:{
            type: dataTypes.ENUM('maculino','femenino'),
            allowNull: false
        },
        Imagen:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Profesion:{
            type: dataTypes.STRING(200),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: 'aspirantes',
        deletedAt: false,
        hooks: {
            beforeCreate: async (aspirante) => {
                if (aspirante.Password) {
                    const salt = await bcrypt.genSalt(10);
                    aspirante.Password = await bcrypt.hash(aspirante.Password, salt);
                }
            },
            beforeUpdate: async (aspirante) => {
                if (aspirante.Password) {
                    const salt = await bcrypt.genSalt(10);
                    aspirante.Password = await bcrypt.hash(aspirante.Password, salt);
                }
            }
        }
    };
    
    const Aspirante = sequelize.define(alias, cols, config);  

    // Aspirante.associate = function(models){
    //     Aspirante.belongsTo(models.Profesiones, {
    //         as: "Profesiones",
    //         foreignKey: "Profesion"
    //     });
    // }

    return Aspirante;
};