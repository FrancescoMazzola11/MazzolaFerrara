const Agronomist = require("../models/Agronomist");
const Farmer = require("../models/Farmer");
const HttpError = require("../models/http-error");
const SteeringInitative = require("../models/SteeringInitative");

const getFarmers = async (req, res, next) => {
  try {
    let farmers;

    farmers = await Farmer.findAll({
      attributes: ["id", "mail", "trend"],
      order: [["mail", "ASC"]],
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

    if (!farmerInfo.farmerInfo) {
      return next(
        new HttpError(
          "The farmer id inserted not exist, try with another id.",
          500
        )
      );
    }
    console.log(farmerInfo);

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
      order: [[["startingDate", "DESC"]]],
    });

    res.status(200).json({
      steeringList,
    });
  } catch (err) {
    return next(new HttpError(err, 500));
  }
};

const getSteeringInfo = async (req, res, next) => {
  const { initativeID } = req.params;
  try {
    const steeringInfo = await SteeringInitative.getInfo(initativeID);
    if (!steeringInfo.si) {
      return next(
        new HttpError(
          "The steering initiative id inserted not exist, try with another id.",
          500
        )
      );
    }
    res.status(200).json({
      steeringInfo,
    });
  } catch (error) {
    return next(new HttpError(error, 500));
  }
};

const evaluateFarmer = async (req, res, next) => {
  const { farmerID, grade } = req.body;

  if (grade == 1 || grade == 0) {
    try {
      const farmer = await Farmer.findOne({ where: { id: farmerID } });
      if (!farmer) {
        return next(new HttpError("No farmer with this id found", 500));
      }
      await Farmer.evaluateFarmer(farmerID, grade);
      res.status(200).json("Farmer correctly evaluated.");
    } catch (error) {
      return next(new HttpError(error, 500));
    }
  } else {
    return next(
      new HttpError(
        "A farmer can be evaluated only positively o negatively",
        500
      )
    );
  }
};

const evaluateSteering = async (req, res, next) => {
  const { initativeID, grade } = req.body;

  if (grade) {
    try {
      const steering = SteeringInitative.findOne({
        where: { initativeID },
      });

      if (!steering) {
        return next(
          new HttpError(
            "No steering initiative with this id founded, try with another id",
            500
          )
        );
      }

      await SteeringInitative.evaluateSteering(initativeID, grade);
      res.status(200).json("Steering correctly evaluated.");
    } catch (error) {
      return next(new HttpError(error, 500));
    }
  } else {
    return next(
      new HttpError("A steering initiative can be graded only positively", 500)
    );
  }
};

exports.evaluateFarmer = evaluateFarmer;
exports.evaluateSteering = evaluateSteering;
exports.getFarmers = getFarmers;
exports.getFarmerInfo = getFarmerInfo;
exports.getSteering = getSteering;
exports.getSteeringInfo = getSteeringInfo;
