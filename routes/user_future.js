const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/futurecontroller");

router.post("/addfuture", isAuthenticated, controller.addfuture);

router.put("/updatefuture/:id", isAuthenticated, controller.updatefuture);

router.delete("/deletefuture/:id", isAuthenticated, controller.deletefuture);

router.get("/getAllfuture", isAuthenticated, controller.getAllfuture);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put("/future/:userId", isAuthenticated, controller.updateOrCreatefuture);

router.get("/futureByID/:id", isAuthenticated, controller.futureByID);
router.get("/futureByUserID/:id", isAuthenticated, controller.futureByUserID);

module.exports = router;
