const Agronomist = require("../models/Agronomist");
const Farmer = require("../models/Farmer");
const HttpError = require("../models/http-error");
const SteeringInitative = require("../models/SteeringInitative");

const getFarmers = async (req, res, next) => {
  try {
    let farmers;

    farmers = await Farmer.findAll({
      attributes: ["id", "mail"],
      order: [
        ["mail", "ASC"]
      ]
    });

    res.status(200).json({
      farmers,
    });
  } catch (err) {
    return next(
      new HttpError(
        "At the moment is not possibile to retrieve farmers, try again later.",
        500
      )
    );
  }
};

const getFarmerInfo = async (req, res, next) => {
  const { farmerID } = req.params;
  try {
    let farmerInfo;

    farmerInfo = await Farmer.getInfo(farmerID);

    res.status(200).json({
      farmerInfo,
    });
  } catch (err) {
    return next(
      new HttpError(
        "At the moment is not possibile to retrieve farmers, try again later.",
        500
      )
    );
  }
};

const getSteering = async (req, res, next) => {
  try {
    const steeringList = await SteeringInitative.findAll({
      include: [
        { as: "farmer", model: Farmer, attributes: ["mail"] },
        { as: "agronomist", model: Agronomist, attributes: ["email"] },
      ], 
      order: [[['startingDate', 'DESC']]],
    });

    res.status(200).json({
      steeringList,
    });
  } catch (err) {
    return next(
      new HttpError(
        err,
        500
      )
    );
  }
};

const getSteeringInfo = async (req, res, next) => {
  const { initativeID } = req.params;
  try {
    const steeringInfo = await SteeringInitative.getInfo(initativeID);
    res.status(200).json({
      steeringInfo,
    });
  } catch (error) {
    return next(new HttpError("An error occured, try again later", 500));
  }
};

const evaluateFarmer = async (req, res, next) => {
  const { farmerID, grade } = req.body;
  try {
    await Farmer.evaluateFarmer(farmerID, grade);
    res.status(200).json("Farmer correctly evaluated.");
  } catch (error) {
    return next(new HttpError(error, 500));
  }
};

const evaluateSteering = async (req, res, next) => {
  const { initativeID, grade } = req.body;
  try {
    await SteeringInitative.evaluateSteering(initativeID, grade);
    res.status(200).json("Steering correctly evaluated.");
  } catch (error) {
    return next(new HttpError("Error while evaluating, try again later.", 500));
  }
};

exports.evaluateFarmer = evaluateFarmer;
exports.evaluateSteering = evaluateSteering;
exports.getFarmers = getFarmers;
exports.getFarmerInfo = getFarmerInfo;
exports.getSteering = getSteering;
exports.getSteeringInfo = getSteeringInfo;
