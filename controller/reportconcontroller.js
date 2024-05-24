const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Meeting = require("../models/meeting_model");
const ObjectId = require("mongodb").ObjectId;
const CsvParser = require("json2csv").Parser;

module.exports = {
  getReportData: async (req, res) => {
    try {
      let users = [];
      const { id } = req.params;
      var userData = await Meeting.find({ userId: new ObjectId(id) });

      console.log(userData);

      userData.forEach((user) => {
        const {
          dateofmeeting,
          subject,
          discussion,
          mimeeting,
          advices,
          outcomes,
        } = user;
        users.push({
          dateofmeeting,
          subject,
          discussion,
          mimeeting,
          advices,
          outcomes,
        });
      });

      const csvField = [
        "Date",
        "Subject",
        "Discussion",
        "Minute of Meetings",
        "Advices",
        "Outcomes",
      ];
      const csvParser = new CsvParser({ csvField });
      const csvData = csvParser.parse(users);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment:filename=report.csv");

      res.status(201).send(csvData);
    } catch (err) {
      res.send({ status: 400, success: false, msg: err.message });
    }
  },
};
