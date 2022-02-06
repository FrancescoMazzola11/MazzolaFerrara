var DataTypes = require("sequelize").DataTypes;
var _Advice = require("./Advice");
var _Comment = require("./Comment");
var _Discussion = require("./Discussion");
var _Farmer = require("./Farmer");
var _Forecast = require("./Forecast");
var _Location = require("./Location");
var _PolicyMaker = require("./PolicyMaker");
var _ProdTypeFarmer = require("./ProdTypeFarmer");
var _Production = require("./Production");
var _ProductionType = require("./ProductionType");
var _Report = require("./Report");
var _SteeringInitative = require("./SteeringInitative");

function initModels(sequelize) {
  var Advice = _Advice(sequelize, DataTypes);
  var Comment = _Comment(sequelize, DataTypes);
  var Discussion = _Discussion(sequelize, DataTypes);
  var Farmer = _Farmer(sequelize, DataTypes);
  var Forecast = _Forecast(sequelize, DataTypes);
  var Location = _Location(sequelize, DataTypes);
  var PolicyMaker = _PolicyMaker(sequelize, DataTypes);
  var ProdTypeFarmer = _ProdTypeFarmer(sequelize, DataTypes);
  var Production = _Production(sequelize, DataTypes);
  var ProductionType = _ProductionType(sequelize, DataTypes);
  var Report = _Report(sequelize, DataTypes);
  var SteeringInitative = _SteeringInitative(sequelize, DataTypes);

  Farmer.belongsToMany(ProductionType, { as: 'prodTypeID_ProductionTypes', through: ProdTypeFarmer, foreignKey: "farmerID", otherKey: "prodTypeID" });
  ProductionType.belongsToMany(Farmer, { as: 'farmerID_Farmers', through: ProdTypeFarmer, foreignKey: "prodTypeID", otherKey: "farmerID" });
  Comment.belongsTo(Discussion, { as: "discussion", foreignKey: "discussionID"});
  Discussion.hasMany(Comment, { as: "Comments", foreignKey: "discussionID"});
  Comment.belongsTo(Farmer, { as: "farmer", foreignKey: "farmerID"});
  Farmer.hasMany(Comment, { as: "Comments", foreignKey: "farmerID"});
  Discussion.belongsTo(Farmer, { as: "farmer", foreignKey: "farmerID"});
  Farmer.hasMany(Discussion, { as: "Discussions", foreignKey: "farmerID"});
  ProdTypeFarmer.belongsTo(Farmer, { as: "farmer", foreignKey: "farmerID"});
  Farmer.hasMany(ProdTypeFarmer, { as: "ProdTypeFarmers", foreignKey: "farmerID"});
  Production.belongsTo(Farmer, { as: "farmer", foreignKey: "farmerID"});
  Farmer.hasMany(Production, { as: "Productions", foreignKey: "farmerID"});
  SteeringInitative.belongsTo(Farmer, { as: "farmer", foreignKey: "farmerID"});
  Farmer.hasMany(SteeringInitative, { as: "SteeringInitatives", foreignKey: "farmerID"});
  Farmer.belongsTo(Location, { as: "location", foreignKey: "locationID"});
  Location.hasMany(Farmer, { as: "Farmers", foreignKey: "locationID"});
  Forecast.belongsTo(Location, { as: "location", foreignKey: "locationID"});
  Location.hasMany(Forecast, { as: "Forecasts", foreignKey: "locationID"});
  SteeringInitative.belongsTo(PolicyMaker, { as: "pm", foreignKey: "pmID"});
  PolicyMaker.hasMany(SteeringInitative, { as: "SteeringInitatives", foreignKey: "pmID"});
  Advice.belongsTo(ProductionType, { as: "prodType", foreignKey: "prodTypeID"});
  ProductionType.hasMany(Advice, { as: "Advices", foreignKey: "prodTypeID"});
  ProdTypeFarmer.belongsTo(ProductionType, { as: "prodType", foreignKey: "prodTypeID"});
  ProductionType.hasMany(ProdTypeFarmer, { as: "ProdTypeFarmers", foreignKey: "prodTypeID"});
  Production.belongsTo(ProductionType, { as: "prodType", foreignKey: "prodTypeID"});
  ProductionType.hasMany(Production, { as: "Productions", foreignKey: "prodTypeID"});
  Report.belongsTo(ProductionType, { as: "prodType", foreignKey: "prodTypeID"});
  ProductionType.hasMany(Report, { as: "Reports", foreignKey: "prodTypeID"});
  SteeringInitative.belongsTo(Report, { as: "report", foreignKey: "reportID"});
  Report.hasMany(SteeringInitative, { as: "SteeringInitatives", foreignKey: "reportID"});

  return {
    Advice,
    Comment,
    Discussion,
    Farmer,
    Forecast,
    Location,
    PolicyMaker,
    ProdTypeFarmer,
    Production,
    ProductionType,
    Report,
    SteeringInitative,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
