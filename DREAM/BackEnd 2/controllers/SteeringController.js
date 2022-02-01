const Farmer = require("../models/Farmer");

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
    const {farmerID, agronomistName } = req.body;
    try {

    } catch (error) {
        
    }
}

exports.getBadFarmers = getBadFarmers;
