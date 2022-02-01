const Farmer = require("../models/Farmer");
const HttpError = require("../models/http-error");
const SteeringInitative = require("../models/SteeringInitative");

const getBadFarmers = async (req, res, next) => {
  try {
    let badFarmers;

    badFarmers = await Farmer.getBadFarmers();

    res.json({
      badFarmers,
    });
  } catch (err) {
    return next(new HttpError("Athentication failed, try again later.", 500));
  }
};

const createSteeringInitative = async (req, res, next) => {
  const pmID = req.userData.id;
  const { farmerID, agronomistName } = req.body;
  try {
    const si = await SteeringInitative.createSteering(farmerID, agronomistName, pmID);
    res.json({
      si,
    });
  } catch (error) {
    return next(new HttpError("Athentication failed, try again later.", 500));
  }
};


exports.createSteeringInitative = createSteeringInitative;
exports.getBadFarmers = getBadFarmers;
