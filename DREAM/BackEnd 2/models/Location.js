const Sequelize = require("sequelize");
const db = require("../config/database");
const Location = db.define(
  "Location",
  {
    locationID: {
      autoIncrement: true,
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "Location",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "locationID" }],
      },
    ],
  }
);

module.exports = Location;
