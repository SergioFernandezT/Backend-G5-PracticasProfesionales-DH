const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Aspirante = sequelize.define('Aspirante', {
        Nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Apellido: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        Email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Telefono: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Perfil_linkedin: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Sexo: {
            type: DataTypes.ENUM('masculino', 'femenino'),
            allowNull: false
        },
        Imagen: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'aspirantes',
        timestamps: false,
        hooks: {
            beforeCreate: async aspirante => {
                aspirante.password = await bcrypt.hash(aspirante.password, 10);
            },
            beforeUpdate: async aspirante => {
                if (aspirante.password) {
                    aspirante.password = await bcrypt.hash(aspirante.password, 10);
                }
            }
        }
    });

    Aspirante.associate = models => {
        Aspirante.belongsTo(models.Profesion, {
            as: 'profesiones_de_aspirante',
            foreignKey: 'profesion_id'
        });
    };

    return Aspirante;
};
