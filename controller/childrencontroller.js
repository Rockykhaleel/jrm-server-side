const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Women = require("../models/womchildren_model");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const CsvParser = require("json2csv").Parser;

module.exports = {
  //{ ulamaname, ulamaposition, ulamacontact, userId }
  addchildren: async (req, res) => {
    const { programsconducted, nofwomchilassosi, outcomes, userId } = req.body;
    const newCategories = new Women({
      programsconducted,
      nofwomchilassosi,
      outcomes,
      userId,
    });
    try {
      const resp = await newCategories.save();
      res.status(201).send({ message: "New Women Children Dept Added", resp });
    } catch (error) {
      res.status(500).send({ message: "Some Internal Server Error" });
    }
  },
  //id
  updatechildren: async (req, res) => {
    const { id } = req.params;
    try {
      const resp = await Women.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Women Children Dept Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //id
  deletechildren: async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
      const child = await Women.findByIdAndDelete(id);
      res.status(200).json({
        message: "Women Children Dept deleted successfully",
        data: child,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllchildren: async (req, res) => {
    try {
      const product = await Women.find(); //fetch data from Database
      res.status(200).json({
        message: "Women Children Dept fetched successfully",
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
      var userData = await Women.find({ userId: new ObjectId(id) });

      // After fetching data from the database
      // console.log("User Data:", userData);

      userData.forEach((user) => {
        const { programsconducted, nofwomchilassosi, outcomes } = user;
        users.push({
          programsconducted,
          nofwomchilassosi,
          outcomes,
        });
      });

      const csvField = ["programsconducted", "nofwomchilassosi", "outcomes"];
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
  childrenByUserID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Women.find({ userId: new ObjectId(id) });
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Women Children Dept fetched successfully",
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
  childrenByID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Women.findById(id);
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Women fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },

  updateOrCreatechildren: async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    try {
      const makatib = await Women.findByIdAndUpdate(
        userId,
        updateData,
        { upsert: true, new: true, setDefaultsOnInsert: true } // Options
      );
      res.status(200).json({
        message: "Women updated successfully",
        data: makatib,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
