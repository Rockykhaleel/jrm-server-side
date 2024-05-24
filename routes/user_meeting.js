const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/meetingconscontroller");

router.post("/addmeeting", isAuthenticated, controller.addmeeting);

router.put("/updatemeeting/:id", isAuthenticated, controller.updatemeeting);

router.delete("/deletemeeting/:id", isAuthenticated, controller.deletemeeting);

router.get("/getAllmeeting", isAuthenticated, controller.getAllmeeting);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put(
  "/meeting/:userId",
  isAuthenticated,
  controller.updateOrCreatemeeting
);

router.get("/meetingByUserID/:id", isAuthenticated, controller.meetingByUserID);
router.get("/meetingByID/:id", isAuthenticated, controller.meetingByID);

module.exports = router;
