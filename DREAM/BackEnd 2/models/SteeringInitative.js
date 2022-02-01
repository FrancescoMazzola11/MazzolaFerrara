const Sequelize = require("sequelize");
const db = require("../config/database");
var moment = require("moment-timezone");
const { report } = require("../routes/evaluate-routes");
const Report = require("./Report");
const ProductionType = require("./ProductionType");
const Farmer = require("./Farmer");

const SteeringInitative = db.define(
  "SteeringInitative",
  {
    initativeID: {
      autoIncrement: true,
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    agronomistName: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    },
    grade: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },
    startingDate: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: true,
    },
    farmerID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Farmer",
        key: "id",
      },
    },
    pmID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "PolicyMaker",
        key: "pmID",
      },
    },
  },
  {
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

SteeringInitative.createSteering = async function (
  farmerID,
  agronomistName,
  pmID
) {
  try {
    const si = await SteeringInitative.create({
      farmerID,
      agronomistName,
      startingDate: moment().format(),
      pmID,
    });
    return si;
  } catch (error) {
    throw error;
  }
};

SteeringInitative.getInfo = async function (initativeID) {
  try {
    const si = await SteeringInitative.findOne({
      where: {
        initativeID,
      },
    });
    let report;
    if (moment(si.startingDate).add(3, "M").isSameOrBefore(moment())) {
      report = await Report.findAll({
        where: {
          initativeID,
        },
        include: [
          { as: "prodType", model: ProductionType, attributes: ["name"] },
        ],
      });
    }
    return { si, report };
  } catch (error) {
    throw error;
  }
};
Report.belongsTo(SteeringInitative, {
  as: "steeringInitative",
  foreignKey: "initativeID",
});
SteeringInitative.belongsTo(Farmer, { as: "farmer", foreignKey: "farmerID"});
Farmer.hasMany(SteeringInitative, { as: "SteeringInitatives", foreignKey: "farmerID"});
module.exports = SteeringInitative;
