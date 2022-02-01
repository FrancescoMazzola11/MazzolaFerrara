const express = require("express");

const accountManagement = require("../controllers/AccountManagement")

const router = express.Router();

router.post("/accedi", accountManagement.login);

module.exports = router;