const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/usercontroller");

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/userByID/:id", isAuthenticated, controller.userByID);

router.put("/updateUser/:id", isAuthenticated, controller.updateUser);

// //only by Admin
// router.delete("/deleteUser/:id", controller.deleteUser);

//only by Admin
router.post("/getAllUsers", isAuthenticated, controller.getAllUsers);

// //protected Route
// router.get("/profile", isAuthenticated, controller.profile);

// router.post("/logout", async (req, res) => {});

module.exports = router;
