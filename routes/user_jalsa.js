const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/jalsacontroller");

router.post("/addjulus", isAuthenticated, controller.addjulus);

router.put("/updatejulus/:id", isAuthenticated, controller.updatejulus);

router.delete("/deletejulus/:id", isAuthenticated, controller.deletejulus);

router.get("/getAlljulus", isAuthenticated, controller.getAlljulus);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put("/julus/:userId", isAuthenticated, controller.updateOrCreateJalsa);

router.get("/julusByID/:id", isAuthenticated, controller.julusByID);
router.get("/julusByUserID/:id", isAuthenticated, controller.julusByUserID);

module.exports = router;
