const express = require("express");
const steeringController = require("../controllers/SteeringController")
const checkAuth = require("../middleware/auth");

const router = express.Router();

router.use(checkAuth)
router.get("/getBadFarmer", steeringController.getBadFarmers);
router.post("/createSteering", steeringController.createSteeringInitative)
module.exports = router;