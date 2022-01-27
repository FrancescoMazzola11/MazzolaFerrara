const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProdTypeFarmer', {
    prodTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ProductionType',
        key: 'prodTypeID'
      }
    },
    farmerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Farmer',
        key: 'id'
      }
    }
  }, {
    sequelize,
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
};
