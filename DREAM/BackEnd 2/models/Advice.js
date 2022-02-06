const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Advice', {
    adviceID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    suggestion: {
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
    }
  }, {
    sequelize,
    tableName: 'Advice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "adviceID" },
        ]
      },
      {
        name: "Advice_FK",
        using: "BTREE",
        fields: [
          { name: "prodTypeID" },
        ]
      },
    ]
  });
};
