const Sequelize = require("sequelize");
const db = require("../config/database");
const Location = require("./Location");
const ProdTypeFarmer = require("./ProdTypeFarmer");
const Production = require("./Production");
const ProductionType = require("./ProductionType");

const Farmer = db.define(
  "Farmer",
  {
    id: {
      autoIncrement: true,
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    mail: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    },
    trend: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    },
    locationID: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Location",
        key: "locationID",
      },
    },
  },
  {
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
      where: {
        trend: "0",
      },
    });
    return badFarmer;
  } catch (error) {
    throw error;
  }
};

Farmer.getInfo = async function (farmerID) {
  try {
    const farmerInfo = await Farmer.findOne({
      where: {
        id: farmerID,
      },
      include: [
        {
          as: "location",
          model: Location,
        },
        {
          as: "ProdTypeFarmers",
          attributes: ["prodTypeID"],
          model: ProdTypeFarmer,
          include: [
            {
              as: "prodType",
              attributes: ["name"],
              model: ProductionType,
            },
          ],
        },
      ],
    });

    const farmerProductions = await Production.findAll({
      where: {
        farmerID,
      },
      include: [
        {as: "prodType", model:ProductionType, attributes:["name"] }
      ]
    });
    return { farmerInfo, farmerProductions };
  } catch (error) {
    throw error;
  }
};

ProdTypeFarmer.belongsTo(Farmer, { as: "farmer", foreignKey: "farmerID" });
Farmer.hasMany(ProdTypeFarmer, {
  as: "ProdTypeFarmers",
  foreignKey: "farmerID",
});

Farmer.belongsTo(Location, { as: "location", foreignKey: "locationID" });
Location.hasMany(Farmer, { as: "Farmers", foreignKey: "locationID" });

module.exports = Farmer;
