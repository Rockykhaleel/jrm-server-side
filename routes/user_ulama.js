const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/ulamacontroller");

router.post("/addulama", isAuthenticated, controller.addulama);

router.put("/updateulama/:id", isAuthenticated, controller.updateulama);

router.delete("/deleteulama/:id", isAuthenticated, controller.deleteulama);

router.get("/getAllulama", isAuthenticated, controller.getAllulama);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put("/ulama/:userId", isAuthenticated, controller.updateOrCreateulama);

router.get("/ulamaByUserID/:id", isAuthenticated, controller.ulamaByUserID);
router.get("/ulamaByID/:id", isAuthenticated, controller.ulamaByID);

module.exports = router;
