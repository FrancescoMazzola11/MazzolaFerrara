const Sequelize = require('sequelize');
const db = require("../config/database");

const ProductionType = db.define('ProductionType', {
    prodTypeID: {
      autoIncrement: true,
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'ProductionType',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "prodTypeID" },
        ]
      },
    ]
  });

  
  module.exports = ProductionType
