const Sequelize = require("sequelize");
const db = require("../config/database");

const Agronomist = db.define(
  "Agronomist",
  {
    agronomistID: {
      autoIncrement: true,
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "Agronomist",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "agronomistID" }],
      },
    ],
  }
);

module.exports = Agronomist;