const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/onlinecontroller");

router.post("/addonline", isAuthenticated, controller.addonline);

router.put("/updateonline/:id", isAuthenticated, controller.updateonline);

router.delete("/deleteonline/:id", isAuthenticated, controller.deleteonline);

router.get("/getAllonline", isAuthenticated, controller.getAllonline);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put("/online/:userId", isAuthenticated, controller.updateOrCreateonline);

router.get("/onlineByID/:id", isAuthenticated, controller.onlineByID);
router.get("/onlineByUserID/:id", isAuthenticated, controller.onlineByUserID);

module.exports = router;
