const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/reportconcontroller");

// router.get("/generate", isAuthenticated, controller.getAllmarkazcon);

router.get("/generate/:id", controller.getReportData);

module.exports = router;
