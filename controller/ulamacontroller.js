const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Ulama = require("../models/ulama_model");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const CsvParser = require("json2csv").Parser;

module.exports = {
  //{ ulamaname, ulamaposition, ulamacontact, userId }
  addulama: async (req, res) => {
    const { ulamaname, ulamaposition, ulamacontact, userId } = req.body;
    const newCategories = new Ulama({
      ulamaname,
      ulamaposition,
      ulamacontact,
      userId,
    });
    try {
      const resp = await newCategories.save();
      res.status(201).send({ message: "New Ulama Added", resp });
    } catch (error) {
      res.status(500).send({ message: "Some Internal Server Error" });
    }
  },
  //id
  updateulama: async (req, res) => {
    const { id } = req.params;
    try {
      const resp = await Ulama.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Ulama Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //id
  deleteulama: async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
      const ulama = await Ulama.findByIdAndDelete(id);
      res.status(200).json({
        message: "Ulama deleted successfully",
        data: ulama,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllulama: async (req, res) => {
    try {
      const product = await Ulama.find(); //fetch data from Database
      res.status(200).json({
        message: "Ulama fetched successfully",
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
      var userData = await Ulama.find({ userId: new ObjectId(id) });

      // After fetching data from the database
      // console.log("User Data:", userData);

      userData.forEach((user) => {
        const { ulamaname, ulamaposition, ulamacontact } = user;
        users.push({
          ulamaname,
          ulamaposition,
          ulamacontact,
        });
      });

      const csvField = ["ulamaname", "ulamaposition", "ulamacontact"];
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
  ulamaByUserID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Ulama.find({ userId: new ObjectId(id) });
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Ulama fetched successfully",
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
  ulamaByID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Ulama.findById(id);
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Ulama fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },

  updateOrCreateulama: async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    try {
      const makatib = await Ulama.findByIdAndUpdate(
        userId,
        updateData,
        { upsert: true, new: true, setDefaultsOnInsert: true } // Options
      );
      res.status(200).json({
        message: "Ulama updated successfully",
        data: makatib,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
