const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Aspirante = sequelize.define('Aspirante', {
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        perfil_linkedin: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        sexo: {
            type: DataTypes.ENUM('masculino', 'femenino'),
            allowNull: false
        },
        imagen: {
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
