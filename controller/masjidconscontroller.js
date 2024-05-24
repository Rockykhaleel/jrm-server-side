const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const MasjidCons = require("../models/masjidcons_model");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const CsvParser = require("json2csv").Parser;

module.exports = {
  //{ plan, budget, status,etocompletion,facilities, userId }
  addmasjidcons: async (req, res) => {
    const {
      plan,
      budget,
      status,
      etocompletion,
      facilities,
      imagePath,
      userId,
    } = req.body;
    const newCategories = new MasjidCons({
      plan,
      budget,
      status,
      etocompletion,
      facilities,
      image: imagePath,

      userId,
    });
    try {
      const resp = await newCategories.save();
      res.status(201).send({ message: "New Masjid Construction Added", resp });
    } catch (error) {
      res.status(500).send({ message: "Some Internal Server Error" });
    }
  },
  //id
  updatemasjidcons: async (req, res) => {
    const { id } = req.params;
    try {
      const resp = await MasjidCons.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Masjid Construction Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //id
  deletemasjidcons: async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
      const child = await MasjidCons.findByIdAndDelete(id);
      res.status(200).json({
        message: "Masjid Construction deleted successfully",
        data: child,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllmasjidcons: async (req, res) => {
    try {
      const product = await MasjidCons.find(); //fetch data from Database
      res.status(200).json({
        message: "Masjid Contruction fetched successfully",
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
      var userData = await MasjidCons.find({ userId: new ObjectId(id) });

      // After fetching data from the database
      // console.log("User Data:", userData);

      userData.forEach((user) => {
        const { plan, budget, status, etocompletion, facilities } = user;
        users.push({
          plan,
          budget,
          status,
          etocompletion,
          facilities,
        });
      });

      const csvField = [
        "plan",
        "budget",
        "status",
        "etocompletion",
        "facilities",
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
  masjidconsByUserID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await MasjidCons.find({ userId: new ObjectId(id) });
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Masjid Construction fetched successfully",
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
  masjidconsByID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await MasjidCons.findById(id);
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Masjid Construction fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },

  updateOrCreatemasjidcons: async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    try {
      const makatib = await MasjidCons.findByIdAndUpdate(
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
