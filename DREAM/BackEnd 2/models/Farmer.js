const Sequelize = require("sequelize");
const db = require("../config/database");

const Farmer = db.define(
  "Farmer",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    trend: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    locationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Location",
        key: "locationID",
      },
    },
  },
  {
    sequelize,
    tableName: "Farmer",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "Farmer_FK",
        using: "BTREE",
        fields: [{ name: "locationID" }],
      },
    ],
  }
);

Farmer.getBadFarmers = async function () {
  try {
    const badFarmer = await Farmer.findAll({
      where : {
        trend : "0"
      }
    })
    return badFarmer;
  } catch (error) {
    throw error;
  }
}

module.exports = Farmer;
