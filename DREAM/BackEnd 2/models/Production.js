const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Production', {
    productionID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    problem: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prodTypeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProductionType',
        key: 'prodTypeID'
      }
    },
    farmerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Farmer',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Production',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productionID" },
        ]
      },
      {
        name: "Production_FK",
        using: "BTREE",
        fields: [
          { name: "prodTypeID" },
        ]
      },
      {
        name: "Production_FK_1",
        using: "BTREE",
        fields: [
          { name: "farmerID" },
        ]
      },
    ]
  });
};
