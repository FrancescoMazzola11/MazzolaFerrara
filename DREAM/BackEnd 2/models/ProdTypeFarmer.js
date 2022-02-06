const Sequelize = require('sequelize');
const db = require("../config/database");
const ProductionType = require('./ProductionType');
const ProdTypeFarmer = db.define('ProdTypeFarmer', {
    prodTypeID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ProductionType',
        key: 'prodTypeID'
      }
    },
    farmerID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Farmer',
        key: 'id'
      }
    }
  }, {
    tableName: 'ProdTypeFarmer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "prodTypeID" },
          { name: "farmerID" },
        ]
      },
      {
        name: "ProdTypeFarmer_FK_1",
        using: "BTREE",
        fields: [
          { name: "farmerID" },
        ]
      },
    ]
  });
  ProdTypeFarmer.belongsTo(ProductionType, { as: "prodType", foreignKey: "prodTypeID"});
  ProductionType.hasMany(ProdTypeFarmer, { as: "ProdTypeFarmers", foreignKey: "prodTypeID"});


  module.exports = ProdTypeFarmer;
