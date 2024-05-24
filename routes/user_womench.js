const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/childrencontroller");

router.post("/addchildren", isAuthenticated, controller.addchildren);

router.put("/updatechildren/:id", isAuthenticated, controller.updatechildren);

router.delete(
  "/deletechildren/:id",
  isAuthenticated,
  controller.deletechildren
);

router.get("/getAllchildren", isAuthenticated, controller.getAllchildren);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put(
  "/children/:userId",
  isAuthenticated,
  controller.updateOrCreatechildren
);

router.get(
  "/childrenByUserID/:id",
  isAuthenticated,
  controller.childrenByUserID
);
router.get("/childrenByID/:id", isAuthenticated, controller.childrenByID);

module.exports = router;
