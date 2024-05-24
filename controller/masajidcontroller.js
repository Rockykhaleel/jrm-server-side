const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Masajids = require("../models/masajid_model");
const ObjectId = require("mongodb").ObjectId;
const CsvParser = require("json2csv").Parser;

module.exports = {
  addmasjids: async (req, res) => {
    const {
      name,
      places,
      workpro,
      activities,
      fundsraised,
      masajidman,
      userId,
    } = req.body;
    const newCategories = new Masajids({
      name,
      places,
      workpro,
      activities,
      fundsraised,
      masajidman,
      userId,
    });
    try {
      const resp = await newCategories.save();
      res.status(201).send({ message: "New Masajids Added", resp });
    } catch (error) {
      res.status(500).send({ message: "Some Internal Server Error" });
    }
  },
  //id
  updatemasjids: async (req, res) => {
    const { id } = req.params;
    try {
      const resp = await Masajids.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Masajids Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //id
  deletemasjids: async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
      const child = await Masajids.findByIdAndDelete(id);
      res.status(200).json({
        message: "Masajids deleted successfully",
        data: child,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllmasjids: async (req, res) => {
    try {
      const product = await Masajids.find(); //fetch data from Database
      res.status(200).json({
        message: "Masajids fetched successfully",
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
      var userData = await Masajids.find({ userId: new ObjectId(id) });

      // console.log(userData);

      userData.forEach((user) => {
        const { name, places, workpro, activities, fundsraised, masajidman } =
          user;
        users.push({
          name,
          places,
          workpro,
          activities,
          fundsraised,
          masajidman,
        });
      });

      const csvField = [
        "name",
        "places",
        "workpro",
        "activities",
        "fundsraised",
        "masajidman",
      ];
      const csvParser = new CsvParser({ csvField });
      const csvData = csvParser.parse(users);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment;filename=report.csv");

      res.status(200).send(csvData);
    } catch (err) {
      res.send({ status: 400, success: false, msg: err.message });
    }
  },
  //Get User By Its Id
  //userId
  masjidsByUserID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Masajids.find({ userId: new ObjectId(id) });
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Masajids fetched successfully",
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
  masjidsByID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Masajids.findById(id);
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Masajids fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },

  updateOrCreateMajid: async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    try {
      const makatib = await Masajids.findByIdAndUpdate(
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
