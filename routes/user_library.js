const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/librarycontroller");

router.post("/addlibrary", isAuthenticated, controller.addlibrary);

router.put("/updatelibrary/:id", isAuthenticated, controller.updatelibrary);

router.delete("/deleteLibrary/:id", isAuthenticated, controller.deleteLibrary);

router.get("/getAlllibrary", isAuthenticated, controller.getAlllibrary);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put(
  "/library/:userId",
  isAuthenticated,
  controller.updateOrCreatelibrary
);

router.get("/libraryByUserID/:id", isAuthenticated, controller.libraryByUserID);
router.get("/libraryByID/:id", isAuthenticated, controller.libraryByID);

module.exports = router;
