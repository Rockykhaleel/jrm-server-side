const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/tripscontroller");

router.post("/addtrips", isAuthenticated, controller.addtrips);

router.put("/updatetrips/:id", isAuthenticated, controller.updatetrips);

router.delete("/deletetrips/:id", isAuthenticated, controller.deletetrips);

router.get("/getAlltrips", isAuthenticated, controller.getAlltrips);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put("/trips/:userId", isAuthenticated, controller.updateOrCreatetrips);

router.get("/tripsByID/:id", isAuthenticated, controller.tripsByID);
router.get("/tripsByUserID/:id", isAuthenticated, controller.tripsByUserID);

module.exports = router;
