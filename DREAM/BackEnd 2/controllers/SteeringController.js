const Agronomist = require("../models/Agronomist");
const Farmer = require("../models/Farmer");
const HttpError = require("../models/http-error");
const SteeringInitative = require("../models/SteeringInitative");

const getBadFarmers = async (req, res, next) => {
  try {
    let badFarmers;

    const steerings = await SteeringInitative.getAllActiveSteering();
    const farmerIDs = steerings.map((s) => s.farmerID);
    badFarmers = await Farmer.getBadFarmers(farmerIDs);

    

    res.status(200).json({
      badFarmers,
    });
  } catch (err) {
    return next("An error occured, try again later", 500);
  }
};

const createSteeringInitative = async (req, res, next) => {
  const pmID = req.userData.id;
  const { farmerID, agronomistID } = req.body;
  try {
    const activeFarmerSteering = await SteeringInitative.getActiveSteering(
      farmerID
    );
    if (activeFarmerSteering.length) {
      res.status(500).json("User already in a steering initiative");
    } else {
      const si = await SteeringInitative.createSteering(
        farmerID,
        agronomistID,
        pmID
      );
      res.status(201).json({
        si,
      });
    }
  } catch (error) {
    return next(new HttpError("An error occured, try again later", 500));
  }
};

const getAgronomists = async (req, res, next) => {
  try {
    const agronomists = await Agronomist.findAll();
    res.status(200).json({
      agronomists,
    });
  } catch (error) {
    return next(new HttpError("An error occured, try again later", 500));
  }
};

exports.getAgronomists = getAgronomists;
exports.createSteeringInitative = createSteeringInitative;
exports.getBadFarmers = getBadFarmers;
