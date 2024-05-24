const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/makatibcontroller");

router.post("/addmakatib", isAuthenticated, controller.addmakatib);

router.put("/updatemakatib/:id", isAuthenticated, controller.updatemakatib);

router.delete("/deletemakatib/:id", isAuthenticated, controller.deletemakatib);

router.get("/getAllmakatib", isAuthenticated, controller.getAllmakatib);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put(
  "/makatibs/:userId",
  isAuthenticated,
  controller.updateOrCreateMakatib
);

router.get("/makatibByID/:id", isAuthenticated, controller.makatibByID);
router.get("/makatibByUserID/:id", isAuthenticated, controller.makatibByUserID);

module.exports = router;
