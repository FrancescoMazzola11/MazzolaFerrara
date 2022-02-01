const Farmer = require("../models/Farmer");
const HttpError = require("../models/http-error");
const SteeringInitative = require("../models/SteeringInitative");

const getFarmers = async (req, res, next) => {
  try {
    let farmers;

    farmers = await Farmer.findAll({
      attributes: ["id", "mail"],
    });

    res.json({
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

    res.json({
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
        include: [{ as: "farmer", model: Farmer, attributes: ["mail"]}],
    });

    res.json({
      steeringList,
    });
  } catch (err) {
    return next(
      new HttpError(
        "At the moment is not possibile to retrieve steering initatives, try again later.",
        500
      )
    );
  }
};

const getSteeringInfo = async (req, res, next) => {
    const {initativeID} = req.params;
    try {
        const steeringInfo = await SteeringInitative.getInfo(initativeID);
        res.json({
            steeringInfo
        })
    } catch (error) {
        return next(
            new HttpError(
              "At the moment is not possibile to retrieve information about this steering initative, try again later.",
              500
            )
          );
        
    }
}

exports.getFarmers = getFarmers;
exports.getFarmerInfo = getFarmerInfo;
exports.getSteering = getSteering;
exports.getSteeringInfo = getSteeringInfo;