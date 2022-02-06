const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Forecast', {
    weather: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    locationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Location',
        key: 'locationID'
      }
    }
  }, {
    sequelize,
    tableName: 'Forecast',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "weather" },
          { name: "date" },
        ]
      },
      {
        name: "Forecast_FK",
        using: "BTREE",
        fields: [
          { name: "locationID" },
        ]
      },
    ]
  });
};
