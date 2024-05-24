const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/schoolcontroller");

router.post("/addschool", isAuthenticated, controller.addschool);

router.put("/updateschool/:id", isAuthenticated, controller.updateschool);

router.delete("/deleteschool/:id", isAuthenticated, controller.deleteschool);

router.get("/getAllschool", isAuthenticated, controller.getAllschool);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put("/school/:userId", isAuthenticated, controller.updateOrCreateschool);

router.get("/schoolByID/:id", isAuthenticated, controller.schoolByID);
router.get("/schoolByUserID/:id", isAuthenticated, controller.schoolByUserID);

module.exports = router;
