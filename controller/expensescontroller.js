const dotenv = require("dotenv");
dotenv.config();
const json2csv = require("json2csv").parse;
const fs = require("fs");
const Users = require("../models/user_model");
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
const { log } = require("console");
const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;

module.exports = {
  getExpensesReport: async (req, res) => {
    const { id } = req.params;
    const selectedYear = req.query.year;
    try {
      const booksdistData = await Makatib.aggregate([
        {
          $match: {
            userId: new ObjectId(id),
            $expr: {
              $eq: [{ $year: "$createdAt" }, parseInt(selectedYear)],
            },
          },
        },
        { $project: { expensesdet: 1, salary: 1, _id: 0 } },
      ]);

      const masjidAct = await Masajid.aggregate([
        {
          $match: {
            userId: new ObjectId(id),
            $expr: {
              $eq: [{ $year: "$createdAt" }, parseInt(selectedYear)],
            },
          },
        },
        {
          $project: {
            fundsraised: 1,
          },
        },
      ]);

      const jalsaAct = await Jalsa.aggregate([
        {
          $match: {
            userId: new ObjectId(id),
            $expr: {
              $eq: [{ $year: "$createdAt" }, parseInt(selectedYear)],
            },
          },
        },
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
          $match: {
            userId: new ObjectId(id),
            $expr: {
              $eq: [{ $year: "$createdAt" }, parseInt(selectedYear)],
            },
          },
        },
        {
          $project: {
            expenses: 1,
          },
        },
      ]);

      const TripsAct = await Trips.aggregate([
        {
          $match: {
            userId: new ObjectId(id),
            $expr: {
              $eq: [{ $year: "$createdAt" }, parseInt(selectedYear)],
            },
          },
        },
        {
          $project: {
            expenses: 1,
          },
        },
      ]);

      const SchoolAct = await School.aggregate([
        {
          $match: {
            userId: new ObjectId(id),
            $expr: {
              $eq: [{ $year: "$createdAt" }, parseInt(selectedYear)],
            },
          },
        },
        {
          $project: {
            expenses: 1,
          },
        },
      ]);

      const csvData = [];
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
        const rowData = {};

        //makatib

        if (booksdistData[i]) {
          rowData["makatib_Expenses"] = booksdistData[i].expensesdet;
          totalExpenses += parseFloat(booksdistData[i].expensesdet);
        }

        //masajid

        if (masjidAct[i]) {
          rowData["makatib_funds_raised"] = masjidAct[i].fundsraised;
          totalFunds += parseFloat(masjidAct[i].fundsraised);
        }

        //jalsa expenses

        if (jalsaAct[i]) {
          rowData["Chatti_Expenses"] = jalsaAct[i].chattiexpenses; // Fix the property name here
          totalExpenses += parseFloat(jalsaAct[i].chattiexpenses);
        }
        if (jalsaAct[i]) {
          rowData["Gyarahween_Expenses"] = jalsaAct[i].gyarahweenexpenses; // Fix the property name here
          totalExpenses += parseFloat(jalsaAct[i].gyarahweenexpenses);
        }
        if (jalsaAct[i]) {
          rowData["Meelad_Expenses"] = jalsaAct[i].meeladexpenses; // Fix the property name here
          totalExpenses += parseFloat(jalsaAct[i].meeladexpenses);
        }
        if (jalsaAct[i]) {
          rowData["urs_e_mufti_e_azam_Expenses"] =
            jalsaAct[i].ursemuftieazamexpenses; // Fix the property name here
          totalExpenses += parseFloat(jalsaAct[i].ursemuftieazamexpenses);
        }
        if (jalsaAct[i]) {
          rowData["urs_e_razviya_Expenses"] = jalsaAct[i].urserazviyaexpenses; // Fix the property name here
          totalExpenses += parseFloat(jalsaAct[i].urserazviyaexpenses);
        }
        if (jalsaAct[i]) {
          rowData["urs_e_tajushariya_Expenses"] =
            jalsaAct[i].ursetajushariyaexpenses; // Fix the property name here
          totalExpenses += parseFloat(jalsaAct[i].ursetajushariyaexpenses);
        }

        //jalsa funds

        if (jalsaAct[i]) {
          rowData["Chatti_Funds"] = jalsaAct[i].chattifund; // Fix the property name here
          totalFunds += parseFloat(jalsaAct[i].chattifund);
        }
        if (jalsaAct[i]) {
          rowData["Gyarahween_Funds"] = jalsaAct[i].gyarahweenfund; // Fix the property name here
          totalFunds += parseFloat(jalsaAct[i].gyarahweenfund);
        }
        if (jalsaAct[i]) {
          rowData["Meelad_Funds"] = jalsaAct[i].meeladfund; // Fix the property name here
          totalFunds += parseFloat(jalsaAct[i].meeladfund);
        }
        if (jalsaAct[i]) {
          rowData["urs_e_mufti_e_azam_Funds"] =
            jalsaAct[i].ursemuftieazamyafund; // Fix the property name here
          totalFunds += parseFloat(jalsaAct[i].ursemuftieazamyafund);
        }
        if (jalsaAct[i]) {
          rowData["urs_e_razviya_Funds"] = jalsaAct[i].urserazviyafund; // Fix the property name here
          totalFunds += parseFloat(jalsaAct[i].urserazviyafund);
        }
        if (jalsaAct[i]) {
          rowData["urs_e_tajushariya_Funds"] = jalsaAct[i].ursetajushariyafund; // Fix the property name here
          totalFunds += parseFloat(jalsaAct[i].ursetajushariyafund);
        }

        // Competitions
        if (CompAct[i]) {
          rowData["Competation_expenses"] = CompAct[i].expenses;
          totalExpenses += parseFloat(CompAct[i].expenses);
        }

        // Trips
        if (TripsAct[i]) {
          rowData["Places_expenses"] = TripsAct[i].expenses;
          totalExpenses += parseFloat(TripsAct[i].expenses);
        }

        // School
        if (SchoolAct[i]) {
          rowData["School_expenses"] = SchoolAct[i].expenses;
          totalExpenses += parseFloat(SchoolAct[i].expenses);
        }

        csvData.push(rowData);
      }

      //   console.log("totalExpenses", totalExpenses);

      const formattedTotalExpenses = totalExpenses.toFixed(2);
      const formattedTotalFunds = totalFunds.toFixed(2);

      //   Add total expenses column to each row
      csvData.forEach((row) => {
        row["total_Expenses"] = formattedTotalExpenses;
        row["total_Funds"] = formattedTotalFunds;
      });

      // Convert data to CSV format
      const csv = json2csv(csvData, { header: true });

      // Set response headers for file download
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=expenses_report.csv"
      );

      // Send CSV data as response
      res.status(200).send(csv);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
