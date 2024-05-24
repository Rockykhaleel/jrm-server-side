const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewear/protectedRoute.js");
const controller = require("../controller/annualYearcontroller");
const { getUniqueYears } = require("../controller/annualYearcontroller");

router.get("/getUniqueYears", controller.getUniqueYears);

router.get("/getUniqueYearsAll", async (req, res) => {
  try {
    // Call the getUniqueYears function to retrieve unique years
    const uniqueYears = await getUniqueYears();

    // Send the unique years as a response
    res.status(200).json({ uniqueYears: [uniqueYears] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
