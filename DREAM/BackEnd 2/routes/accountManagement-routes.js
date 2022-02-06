const express = require("express");

const accountManagement = require("../controllers/AccountManagement")

const router = express.Router();

router.post("/", accountManagement.login);

module.exports = router;