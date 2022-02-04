const Agronomist = require("../models/Agronomist");
const Farmer = require("../models/Farmer");
const HttpError = require("../models/http-error");
const SteeringInitative = require("../models/SteeringInitative");

const getBadFarmers = async (req, res, next) => {
  try {
    let badFarmers;

    badFarmers = await Farmer.getBadFarmers();

    res.status(200).json({
      badFarmers,
    });
  } catch (err) {
    return next(new HttpError("An error occured, try again later", 500));
  }
};

const createSteeringInitative = async (req, res, next) => {
  const pmID = req.userData.id;
  const { farmerID, agronomistName } = req.body;
  try {
    const si = await SteeringInitative.createSteering(farmerID, agronomistName, pmID);
    res.status(201).json({
      si,
    });
  } catch (error) {
    return next(new HttpError("An error occured, try again later", 500));
  }
};

const getAgronomists = async (req, res, next) => {
  try {
    const agronomists = await Agronomist.getAgronomists()
    res.status(200).json({
      agronomists
    })
  } catch (error) {
    return next(new HttpError("An error occured, try again later", 500));
  }
}

exports.getAgronomists = getAgronomists;
exports.createSteeringInitative = createSteeringInitative;
exports.getBadFarmers = getBadFarmers;
