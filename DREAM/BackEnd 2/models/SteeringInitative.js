const Sequelize = require("sequelize");
const db = require("../config/database");
var moment = require('moment-timezone');

const SteeringInitative = db.define(
  "SteeringInitative",
  {
    initativeID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    agronomistName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    startingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    farmerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Farmer",
        key: "id",
      },
    },
    pmID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "PolicyMaker",
        key: "pmID",
      },
    },
  },
  {
    sequelize,
    tableName: "SteeringInitative",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "initativeID" }],
      },
      {
        name: "SteeringInitative_FK",
        using: "BTREE",
        fields: [{ name: "pmID" }],
      },
      {
        name: "SteeringInitative_FK_2",
        using: "BTREE",
        fields: [{ name: "farmerID" }],
      },
    ],
  }
);


SteeringInitative.createSteering = async function(farmerID, agronomistName, pmID) {
  try {
    const si = await SteeringInitative.create({
      farmerID,
      agronomistName,
      startingDate: moment().format(),
      pmID
    })
    return si;
  } catch (error) {
    return error;
  }
}

module.exports = SteeringInitative;
