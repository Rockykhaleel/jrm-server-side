const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/markazconcontroller");

router.post("/addmarkazcon", isAuthenticated, controller.addmarkazcon);

router.put("/updatemarkazcon/:id", isAuthenticated, controller.updatemarkazcon);

router.delete(
  "/deletemarkazcon/:id",
  isAuthenticated,
  controller.deletemarkazcon
);

router.get("/getAllmarkazcon", isAuthenticated, controller.getAllmarkazcon);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put(
  "/markazcon/:userId",
  isAuthenticated,
  controller.updateOrCreatemarkazcon
);

router.get("/markazconByID/:id", isAuthenticated, controller.markazconByID);
router.get(
  "/markazconByUserID/:id",
  isAuthenticated,
  controller.markazconByUserID
);

module.exports = router;
