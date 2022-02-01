const Sequelize = require('sequelize');
const db = require("../config/database");

const Production = db.define('Production', {
    productionID: {
      autoIncrement: true,
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    period: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true
    },
    date: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: true
    },
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true
    },
    problem: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true
    },
    prodTypeID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProductionType',
        key: 'prodTypeID'
      }
    },
    farmerID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Farmer',
        key: 'id'
      }
    }
  }, {

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


  module.exports = Production;
