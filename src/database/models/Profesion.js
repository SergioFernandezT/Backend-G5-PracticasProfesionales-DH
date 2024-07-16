const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Profesion = sequelize.define('Profesion', {
    profesion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'profesiones',
    timestamps: false
  });

  return Profesion;
};

