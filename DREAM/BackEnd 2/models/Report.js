const Sequelize = require("sequelize");
const db = require("../config/database");
const ProductionType = require("./ProductionType");
const Report = db.define(
  "Report",
  {
    reportID: {
      autoIncrement: true,
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    prodTypeID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "ProductionType",
        key: "prodTypeID",
      },
    },
    prodRateBefore: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: true,
    },
    prodRateAfter: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: true,
    },
    initativeID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "SteeringInitative",
        key: "initativeID",
      },
    },
  },
  {
    tableName: "Report",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "reportID" }],
      },
      {
        name: "Report_FK",
        using: "BTREE",
        fields: [{ name: "prodTypeID" }],
      },
      {
        name: "Report_FK_1",
        using: "BTREE",
        fields: [{ name: "initativeID" }],
      },
    ],
  }
);

Report.belongsTo(ProductionType, { as: "prodType", foreignKey: "prodTypeID" });
ProductionType.hasMany(Report, { as: "Reports", foreignKey: "prodTypeID" });

module.exports = Report;
