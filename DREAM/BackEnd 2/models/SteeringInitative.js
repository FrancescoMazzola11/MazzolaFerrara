const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SteeringInitative', {
    initativeID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    agronomistName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    farmerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Farmer',
        key: 'id'
      }
    },
    pmID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PolicyMaker',
        key: 'pmID'
      }
    },
  }, {
    sequelize,
    tableName: 'SteeringInitative',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "initativeID" },
        ]
      },
      {
        name: "SteeringInitative_FK",
        using: "BTREE",
        fields: [
          { name: "pmID" },
        ]
      },
      {
        name: "SteeringInitative_FK_2",
        using: "BTREE",
        fields: [
          { name: "farmerID" },
        ]
      },
    ]
  });
};
