const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Farmer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    trend: {
      type: DataTypes.BOOLEAN,
      allowNull: true
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
    tableName: 'Farmer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Farmer_FK",
        using: "BTREE",
        fields: [
          { name: "locationID" },
        ]
      },
    ]
  });
};
