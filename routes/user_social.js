const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/socialcontroller");

router.post("/addsocial", isAuthenticated, controller.addsocial);

router.put("/updatesocial/:id", isAuthenticated, controller.updatesocial);

router.delete("/deletesocial/:id", isAuthenticated, controller.deletesocial);

router.get("/getAllsocial", isAuthenticated, controller.getAllsocial);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put("/social/:userId", isAuthenticated, controller.updateOrCreatesocial);

router.get("/socialByID/:id", isAuthenticated, controller.socialByID);
router.get("/socialByUserID/:id", isAuthenticated, controller.socialByUserID);

module.exports = router;
