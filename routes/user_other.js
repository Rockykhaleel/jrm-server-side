const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/othercontroller");

router.post("/addother", isAuthenticated, controller.addother);

router.put("/updateother/:id", isAuthenticated, controller.updateother);

router.delete("/deleteother/:id", isAuthenticated, controller.deleteother);

router.get("/getAllother", isAuthenticated, controller.getAllother);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put("/other/:userId", isAuthenticated, controller.updateOrCreateother);

router.get("/otherByID/:id", isAuthenticated, controller.otherByID);
router.get("/otherByUserID/:id", isAuthenticated, controller.otherByUserID);

module.exports = router;
