const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Darul = require("../models/markazcon_model");
const ObjectId = require("mongodb").ObjectId;
const CsvParser = require("json2csv").Parser;

module.exports = {
  addmarkazcon: async (req, res) => {
    const { fundmeth, date, transferdto, purpose, userId } = req.body;
    const newCategories = new Darul({
      fundmeth,
      date,
      transferdto,
      purpose,
      userId,
    });
    try {
      const resp = await newCategories.save();
      res.status(201).send({ message: "New Darul Added", resp });
    } catch (error) {
      res.status(500).send({ message: "Some Internal Server Error" });
    }
  },
  //id
  updatemarkazcon: async (req, res) => {
    const { id } = req.params;
    try {
      const resp = await Darul.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Darul Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //id
  deletemarkazcon: async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
      const child = await Darul.findByIdAndDelete(id);
      res.status(200).json({
        message: "Darul deleted successfully",
        data: child,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllmarkazcon: async (req, res) => {
    try {
      const product = await Darul.find(); //fetch data from Database
      res.status(200).json({
        message: "Darul fetched successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //generate report
  getReportData: async (req, res) => {
    try {
      let users = [];
      const { id } = req.params;
      var userData = await Darul.find({ userId: new ObjectId(id) });

      // After fetching data from the database
      // console.log("User Data:", userData);

      userData.forEach((user) => {
        const { fundmeth, date, transferdto, purpose } = user;
        users.push({
          fundmeth,
          date,
          transferdto,
          purpose,
        });
      });

      const csvField = ["fundmeth", "date", "transferdto", "purpose"];
      const csvParser = new CsvParser({ csvField });
      const csvData = csvParser.parse(users);
      // After parsing CSV data
      // console.log("CSV Data:", csvData);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment;filename=report.csv");

      res.status(200).send(csvData);
    } catch (err) {
      res.send({ status: 400, success: false, msg: err.message });
    }
  },
  //Get User By Its Id
  //userId
  markazconByUserID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Darul.find({ userId: new ObjectId(id) });
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Darul fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //id
  markazconByID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Darul.findById(id);
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Darul fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },
  updateOrCreatemarkazcon: async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    try {
      const makatib = await Darul.findByIdAndUpdate(
        userId,
        updateData,
        { upsert: true, new: true, setDefaultsOnInsert: true } // Options
      );

      res.status(200).json({
        message: "Makatib updated successfully",
        data: makatib,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
