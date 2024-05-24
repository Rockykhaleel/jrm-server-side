const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/annualcontroller");
const controllerEx = require("../controller/expensescontroller");

router.get("/getActivitiesReport/:id", controller.getActivitiesReport);

router.get("/getExpensesReport/:id", controllerEx.getExpensesReport);

module.exports = router;
