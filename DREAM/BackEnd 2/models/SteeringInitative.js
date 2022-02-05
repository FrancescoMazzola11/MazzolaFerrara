const Sequelize = require("sequelize");
const db = require("../config/database");
var moment = require("moment-timezone");
const Report = require("./Report");
const ProductionType = require("./ProductionType");
const Farmer = require("./Farmer");
const Location = require("./Location");
const Agronomist = require("./Agronomist");
const { ForeignKeyConstraintError } = require("sequelize");

const SteeringInitative = db.define(
  "SteeringInitative",
  {
    initativeID: {
      autoIncrement: true,
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    agronomistID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Agronomist",
        key: "agronomistID",
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
      {
        name: "SteeringInitative_FK_3",
        unique: true,
        using: "BTREE",
        fields: [{ name: "agronomistID" }],
      },
    ],
  }
);

SteeringInitative.getActiveSteering = async function (farmerID) {
  try {
    const steering = await SteeringInitative.findAll({
      where: {
        farmerID,
        startingDate: {
          [Sequelize.Op.gt]: moment().diff(3, "M"),
        },
      }
    })
    return steering
  } catch (error) {
    throw error
  }
}

SteeringInitative.createSteering = async function (
  farmerID,
  agronomistID,
  pmID
) {
  try {
    const si = await SteeringInitative.create({
      farmerID,
      agronomistID,
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
      include: [
        {
          as: "farmer",
          model: Farmer,
          attributes: ["mail"],
          include: [{ as: "location", model: Location, attributes: ["name"] }],
        },
        {
          as: "agronomist",
          model: Agronomist,
          attributes: ["email"],
        },
      ],
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

SteeringInitative.evaluateSteering = async function (initativeID, grade) {
  try {
    await SteeringInitative.update({
      grade,
    }, 
    {
      where: {
        initativeID
      }
    });
  } catch (error) {
    throw error;
  }
};

Report.belongsTo(SteeringInitative, {
  as: "steeringInitative",
  foreignKey: "initativeID",
});



SteeringInitative.belongsTo(Agronomist, {
  as: "agronomist",
  foreignKey: "agronomistID",
});
Agronomist.hasMany(SteeringInitative, {
  as: "SteeringInitatives",
  foreignKey: "agronomistID",
});

module.exports = SteeringInitative;
