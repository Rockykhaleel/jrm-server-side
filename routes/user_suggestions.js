const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/suggestionscontroller");

router.post("/addsuggestions", isAuthenticated, controller.addsuggestions);

router.put(
  "/updatesuggestions/:id",
  isAuthenticated,
  controller.updatesuggestions
);

router.put(
  "/updateAllSuggestions/:id",
  isAuthenticated,
  controller.updateAllSuggestions
);

router.put(
  "/updateAllSuggestionsAd",
  isAuthenticated,
  controller.updateAllSuggestionsAd
);

router.put("/sendMessage/:id", isAuthenticated, controller.sendMessage);

router.get("/getAllsuggestions", isAuthenticated, controller.getAllsuggestions);

router.get("/suggestionsByID/:id", isAuthenticated, controller.suggestionsByID);

router.get(
  "/suggestionsByUserID/:id",
  isAuthenticated,
  controller.suggestionsByUserID
);

router.get(
  "/suggestionsByUserIDActive/:id",
  isAuthenticated,
  controller.suggestionsByUserIDActive
);

module.exports = router;
