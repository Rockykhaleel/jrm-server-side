const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/masajidcontroller");

router.post("/addmasjids", isAuthenticated, controller.addmasjids);

router.put("/updatemasjids/:id", isAuthenticated, controller.updatemasjids);

router.delete("/deletemasjids/:id", isAuthenticated, controller.deletemasjids);

router.get("/getAllmasjids", isAuthenticated, controller.getAllmasjids);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put("/masjids/:userId", isAuthenticated, controller.updateOrCreateMajid);

router.get("/masjidsByID/:id", isAuthenticated, controller.masjidsByID);
router.get("/masjidsByUserID/:id", isAuthenticated, controller.masjidsByUserID);

module.exports = router;
