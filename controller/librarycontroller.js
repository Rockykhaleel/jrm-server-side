const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Library = require("../models/library_model");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const CsvParser = require("json2csv").Parser;

module.exports = {
  //{ numberofbooks, nameofbooks, avilability, facility, userId }
  addlibrary: async (req, res) => {
    const { numberofbooks, nameofbooks, avilability, facility, userId } =
      req.body;
    const newCategories = new Library({
      numberofbooks,
      nameofbooks,
      avilability,
      facility,
      userId,
    });
    try {
      const resp = await newCategories.save();
      res.status(201).send({ message: "New Library Added", resp });
    } catch (error) {
      res.status(500).send({ message: "Some Internal Server Error" });
    }
  },
  //id
  updatelibrary: async (req, res) => {
    const { id } = req.params;
    try {
      const resp = await Library.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Library Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //id
  deleteLibrary: async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
      const library = await Library.findByIdAndDelete(id);
      res.status(200).json({
        message: "Library deleted successfully",
        data: library,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getAlllibrary: async (req, res) => {
    try {
      const product = await Library.find(); //fetch data from Database
      res.status(200).json({
        message: "Library fetched successfully",
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
      var userData = await Library.find({ userId: new ObjectId(id) });

      // After fetching data from the database
      // console.log("User Data:", userData);

      userData.forEach((user) => {
        const { numberofbooks, nameofbooks, avilability, facility } = user;
        users.push({
          numberofbooks,
          nameofbooks,
          avilability,
          facility,
        });
      });

      const csvField = [
        "numberofbooks",
        "nameofbooks",
        "avilability",
        "facility",
      ];
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
  libraryByUserID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Library.find({ userId: new ObjectId(id) });
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Library fetched successfully",
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
  libraryByID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Library.findById(id);
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Library fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },

  updateOrCreatelibrary: async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    try {
      const makatib = await Library.findByIdAndUpdate(
        userId,
        updateData,
        { upsert: true, new: true, setDefaultsOnInsert: true } // Options
      );
      res.status(200).json({
        message: "Library updated successfully",
        data: makatib,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
