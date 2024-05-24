const dotenv = require("dotenv");
dotenv.config();
const json2csv = require("json2csv").parse;
const fs = require("fs");
const Users = require("../models/user_model");
const Darul = require("../models/darululoom_model");
const Suggestions = require("../models/suggestion_model");
const Makatib = require("../models/makatib_model");
const Masajid = require("../models/masajid_model");
const Jalsa = require("../models/jalsa_model");
const Women = require("../models/womchildren_model");
const Competations = require("../models/competions_model");
const Trips = require("../models/trips_model");
const Social = require("../models/social_model");
const Online = require("../models/online_model");
const School = require("../models/school_model");
const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;

module.exports = {
  //total expenses and funds
  adminDashboard: async (req, res) => {
    try {
      const booksdistData = await Makatib.aggregate([
        { $project: { expensesdet: 1, salary: 1, _id: 0 } },
      ]);

      const masjidAct = await Masajid.aggregate([
        {
          $project: {
            fundsraised: 1,
          },
        },
      ]);

      const jalsaAct = await Jalsa.aggregate([
        {
          $project: {
            chattiexpenses: 1,
            gyarahweenexpenses: 1,
            meeladexpenses: 1,
            ursemuftieazamexpenses: 1,
            urserazviyaexpenses: 1,
            ursetajushariyaexpenses: 1,

            chattifund: 1,
            gyarahweenfund: 1,
            meeladfund: 1,
            ursemuftieazamyafund: 1,
            urserazviyafund: 1,
            ursetajushariyafund: 1,
          },
        },
      ]);

      const CompAct = await Competations.aggregate([
        {
          $project: {
            expenses: 1,
          },
        },
      ]);

      const TripsAct = await Trips.aggregate([
        {
          $project: {
            expenses: 1,
          },
        },
      ]);

      const SchoolAct = await School.aggregate([
        {
          $project: {
            expenses: 1,
          },
        },
      ]);

      let totalExpenses = 0; // Initialize total expenses variable
      let totalFunds = 0;
      for (
        let i = 0;
        i <
        Math.max(
          booksdistData.length,
          masjidAct.length,
          jalsaAct.length,
          CompAct.length,
          TripsAct.length,
          SchoolAct.length
        );
        i++
      ) {
        //makatib

        if (booksdistData[i]) {
          totalExpenses += parseFloat(booksdistData[i].expensesdet);
        }

        //masajid

        if (masjidAct[i]) {
          totalFunds += parseFloat(masjidAct[i].fundsraised);
        }

        //jalsa expenses

        if (jalsaAct[i]) {
          totalExpenses += parseFloat(jalsaAct[i].chattiexpenses);
        }
        if (jalsaAct[i]) {
          totalExpenses += parseFloat(jalsaAct[i].gyarahweenexpenses);
        }
        if (jalsaAct[i]) {
          totalExpenses += parseFloat(jalsaAct[i].meeladexpenses);
        }
        if (jalsaAct[i]) {
          totalExpenses += parseFloat(jalsaAct[i].ursemuftieazamexpenses);
        }
        if (jalsaAct[i]) {
          totalExpenses += parseFloat(jalsaAct[i].urserazviyaexpenses);
        }
        if (jalsaAct[i]) {
          totalExpenses += parseFloat(jalsaAct[i].ursetajushariyaexpenses);
        }

        //jalsa funds

        if (jalsaAct[i]) {
          totalFunds += parseFloat(jalsaAct[i].chattifund);
        }
        if (jalsaAct[i]) {
          totalFunds += parseFloat(jalsaAct[i].gyarahweenfund);
        }
        if (jalsaAct[i]) {
          totalFunds += parseFloat(jalsaAct[i].meeladfund);
        }
        if (jalsaAct[i]) {
          totalFunds += parseFloat(jalsaAct[i].ursemuftieazamyafund);
        }
        if (jalsaAct[i]) {
          totalFunds += parseFloat(jalsaAct[i].urserazviyafund);
        }
        if (jalsaAct[i]) {
          totalFunds += parseFloat(jalsaAct[i].ursetajushariyafund);
        }

        // Competitions
        if (CompAct[i]) {
          totalExpenses += parseFloat(CompAct[i].expenses);
        }

        // Trips
        if (TripsAct[i]) {
          totalExpenses += parseFloat(TripsAct[i].expenses);
        }

        // School
        if (SchoolAct[i]) {
          totalExpenses += parseFloat(SchoolAct[i].expenses);
        }
      }

      const formattedTotalExpenses = totalExpenses.toFixed(2);
      const formattedTotalFunds = totalFunds.toFixed(2);

      const responseObj = {
        formattedTotalExpenses,
        formattedTotalFunds,
      };

      // Send CSV data as response
      res.status(200).json(responseObj);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //total branch numbers
  adminDashboardBranches: async (req, res) => {
    try {
      // Query the Users model to get the count of branches
      const branchCount = await Users.countDocuments({ role: "admin" });

      // Prepare response object
      const responseObject = {
        numberOfBranches: branchCount,
      };

      // Send the response
      res.status(200).json(responseObject);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //total makatibs
  adminDashboardmakatibs: async (req, res) => {
    try {
      // Query the Users model to get the count of branches
      const branchCount = await Makatib.countDocuments();

      // Prepare response object
      const responseObject = {
        numberOfmakatibs: branchCount,
      };

      // Send the response
      res.status(200).json(responseObject);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //total masajids
  adminDashboardmasajids: async (req, res) => {
    try {
      // Query the Users model to get the count of branches
      const branchCount = await Masajid.countDocuments();

      // Prepare response object
      const responseObject = {
        numberOfMasajid: branchCount,
      };

      // Send the response
      res.status(200).json(responseObject);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //total studentsstudying
  adminDashboardstudentsstudying: async (req, res) => {
    try {
      //here
      const data = await Darul.find({}, { nofstudents: 1 });

      if (!data) {
        // Handle case where no document is found
        return res.status(404).json({ message: "Data not found" });
      }

      let totalStudents = 0;

      // Iterate over the documents and sum up the "nofstudents" values
      data.forEach((doc) => {
        totalStudents += parseInt(doc.nofstudents);
      });

      // Prepare response object containing only "nofstudents" field
      const responseObject = { totalStudents };
      // Send the response
      res.status(200).json(responseObject);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
