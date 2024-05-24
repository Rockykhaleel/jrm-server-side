const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/imagecontroller");

router.post("/image", controller.image);

module.exports = router;
