const express = require("express");
const evaluateController = require("../controllers/EvaluateController")
const checkAuth = require("../middleware/auth");

const router = express.Router();

router.use(checkAuth)
router.get("/getFarmers", evaluateController.getFarmers);
router.get("/farmerInfo/:farmerID", evaluateController.getFarmerInfo)
router.get("/getSteering", evaluateController.getSteering);
router.get("/steeringInfo/:initativeID", evaluateController.getSteeringInfo)
router.post("/evaluateFarmer", evaluateController.evaluateFarmer)
router.post("/evaluateSteering", evaluateController.evaluateSteering)

module.exports = router;