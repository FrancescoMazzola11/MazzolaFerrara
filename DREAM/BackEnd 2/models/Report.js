const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report', {
    reportID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prodTypeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProductionType',
        key: 'prodTypeID'
      }
    },
    prodRateBefore: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    prodRateAfter: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Report',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reportID" },
        ]
      },
      {
        name: "Report_FK",
        using: "BTREE",
        fields: [
          { name: "prodTypeID" },
        ]
      },
    ]
  });
};
