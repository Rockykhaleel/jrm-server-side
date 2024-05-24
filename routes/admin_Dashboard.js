const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/adminDashboardcontroller");

router.get("/adminDashboard", controller.adminDashboard);

router.get("/adminDashboardBranches", controller.adminDashboardBranches);

router.get("/adminDashboardmakatibs", controller.adminDashboardmakatibs);

router.get("/adminDashboardmasajids", controller.adminDashboardmasajids);

router.get(
  "/adminDashboardstudentsstudying",
  controller.adminDashboardstudentsstudying
);

module.exports = router;
