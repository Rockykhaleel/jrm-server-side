const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/masjidconscontroller");

router.post("/addmasjidcons", isAuthenticated, controller.addmasjidcons);

router.put(
  "/updatemasjidcons/:id",
  isAuthenticated,
  controller.updatemasjidcons
);

router.delete(
  "/deletemasjidcons/:id",
  isAuthenticated,
  controller.deletemasjidcons
);

router.get("/getAllmasjidcons", isAuthenticated, controller.getAllmasjidcons);

router.get("/getReportData/:id", isAuthenticated, controller.getReportData);

router.put(
  "/masjidcons/:userId",
  isAuthenticated,
  controller.updateOrCreatemasjidcons
);

router.get(
  "/masjidconsByUserID/:id",
  isAuthenticated,
  controller.masjidconsByUserID
);
router.get("/masjidconsByID/:id", isAuthenticated, controller.masjidconsByID);

module.exports = router;
