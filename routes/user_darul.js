const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/darululoomcontroller");

router.post("/adddarululoom", isAuthenticated, controller.adddarululoom);

router.put(
  "/updatedarululoom/:id",
  isAuthenticated,
  controller.updatedarululoom
);

router.delete(
  "/deletedarululoom/:id",
  isAuthenticated,
  controller.deletedarululoom
);

router.get("/getAlldarululoom", isAuthenticated, controller.getAlldarululoom);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put(
  "/darululoom/:userId",
  isAuthenticated,
  controller.updateOrCreatedarululoom
);

router.get("/darululoomByID/:id", isAuthenticated, controller.darululoomByID);
router.get(
  "/darululoomByUserID/:id",
  isAuthenticated,
  controller.darululoomByUserID
);

module.exports = router;
