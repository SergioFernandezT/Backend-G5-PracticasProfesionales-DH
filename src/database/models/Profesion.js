module.exports = (sequelize, DataTypes) => {
  const Profesion = sequelize.define('Profesion', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      profesion: {
          type: DataTypes.STRING(45),
          allowNull: false
      }
  }, {
      tableName: 'profesiones',
      timestamps: false
  });

  Profesion.associate = models => {
      Profesion.hasMany(models.Aspirante, {
          foreignKey: 'profesion',
          as: 'aspirantes'
      });
  };

  return Profesion;
};

