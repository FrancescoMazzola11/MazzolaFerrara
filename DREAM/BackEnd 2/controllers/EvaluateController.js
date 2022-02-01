const Farmer = require("../models/Farmer");
const HttpError = require("../models/http-error");
const SteeringInitative = require("../models/SteeringInitative");

const getFarmers = async (req, res, next) => {
  try {
    let farmers;

    farmers = await Farmer.findAll({
        attributes: ["id", "mail"]
    });

    res.json({
      farmers,
    });
  } catch (err) {
    return next(new HttpError("At the moment is not possibile to retrieve farmers, try again later.", 500));
  }
};

const getFarmerInfo = async (req, res, next) => {
  const { farmerID } = req.params;
  try {
    let farmerInfo;

    farmerInfo = await Farmer.getInfo(farmerID);

    res.json({
      farmerInfo,
    });
  } catch (err) {
    return next(new HttpError(err, 500));
  }
};

exports.getFarmers = getFarmers;
exports.getFarmerInfo = getFarmerInfo;
