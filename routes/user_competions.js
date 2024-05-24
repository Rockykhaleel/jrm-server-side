const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/competionscontroller");

router.post("/addcompetions", isAuthenticated, controller.addcompetions);

router.put(
  "/updatecompetions/:id",
  isAuthenticated,
  controller.updatecompetions
);

router.delete(
  "/deletecompetions/:id",
  isAuthenticated,
  controller.deletecompetions
);

router.get("/getAllcompetions", isAuthenticated, controller.getAllcompetions);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put(
  "/competions/:userId",
  isAuthenticated,
  controller.updateOrCreatecompetions
);

router.get("/competionsByID/:id", isAuthenticated, controller.competionsByID);
router.get(
  "/competionsByUserID/:id",
  isAuthenticated,
  controller.competionsByUserID
);

module.exports = router;
