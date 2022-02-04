const express = require("express");
const steeringController = require("../controllers/SteeringController")
const checkAuth = require("../middleware/auth");

const router = express.Router();

router.use(checkAuth)
router.get("/getBadFarmers", steeringController.getBadFarmers);
router.get("/getAgronomists", steeringController.getAgronomists);
router.post("/createSteering", steeringController.createSteeringInitative)
module.exports = router;