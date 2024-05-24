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
  getActivitiesReport: async (req, res) => {
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
        { $project: { booksdist: 1, _id: 0 } },
      ]);

      // console.log(booksdistData);

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
            activities: 1,
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
            chattiactivities: 1,
            gyarahweenactivities: 1,
            meeladactivities: 1,
            ursemuftieazamactivities: 1,
            urserazviyaactivities: 1,
            ursetajushariyaactivities: 1,
          },
        },
      ]);

      const womenAct = await Women.aggregate([
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
            programsconducted: 1,
            nofwomchilassosi: 1,
            outcomes: 1,
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
            tyocompetion: 1,
            dateorganized: 1,
            nospasticipated: 1,
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
            places: 1,
            date: 1,
            nospasticipated: 1,
            outcomes: 1,
          },
        },
      ]);

      const SocialAct = await Social.aggregate([
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
            platform: 1,
            date: 1,
            typeofupload: 1,
            reach: 1,
            likes: 1,
          },
        },
      ]);

      const OnlineAct = await Online.aggregate([
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
            progfor: 1,
            date: 1,
            topic: 1,
            outcome: 1,
            noparti: 1,
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
            activities: 1,
            classesdet: 1,
            outcome: 1,
          },
        },
      ]);

      //   console.log(SocialAct);
      // Prepare data for CSV format
      const csvData = [];
      for (
        let i = 0;
        i <
        Math.max(
          booksdistData.length,
          masjidAct.length,
          jalsaAct.length,
          womenAct.length,
          CompAct.length,
          TripsAct.length,
          SocialAct.length,
          OnlineAct.length,
          SchoolAct.length
        );
        i++
      ) {
        const rowData = {};
        //
        if (booksdistData[i]) {
          rowData["Books_Distributed"] = booksdistData[i].booksdist;
        }
        if (masjidAct[i]) {
          rowData["Masjid_Activities"] = masjidAct[i].activities;
        }
        if (jalsaAct[i]) {
          rowData["Chatti_Activities"] = jalsaAct[i].chattiactivities; // Fix the property name here
        }
        if (jalsaAct[i]) {
          rowData["Gyarahween_Activities"] = jalsaAct[i].gyarahweenactivities; // Fix the property name here
        }
        if (jalsaAct[i]) {
          rowData["Meelad_Activities"] = jalsaAct[i].meeladactivities; // Fix the property name here
        }
        if (jalsaAct[i]) {
          rowData["urs_e_mufti_e_azam_Activities"] =
            jalsaAct[i].ursemuftieazamactivities; // Fix the property name here
        }
        if (jalsaAct[i]) {
          rowData["urs_e_razviya_Activities"] =
            jalsaAct[i].urserazviyaactivities; // Fix the property name here
        }
        if (jalsaAct[i]) {
          rowData["urs_e_tajushariya_Activities"] =
            jalsaAct[i].ursetajushariyaactivities; // Fix the property name here
        }
        //
        //women
        if (womenAct[i]) {
          rowData["Programs_conducted"] = womenAct[i].programsconducted; // Fix the property name here
        }
        if (womenAct[i]) {
          rowData["Number_of_women_children_associated"] =
            womenAct[i].nofwomchilassosi; // Fix the property name here
        }
        if (womenAct[i]) {
          rowData["outcomes"] = womenAct[i].outcomes; // Fix the property name here
        }

        // Competitions
        if (CompAct[i]) {
          rowData["Competation_Type"] = CompAct[i].tyocompetion;
        }
        if (CompAct[i]) {
          rowData["Competation_Date"] = CompAct[i].dateorganized;
        }
        if (CompAct[i]) {
          rowData["Number_of_Participants_Competitions"] =
            CompAct[i].nospasticipated;
        }

        // Trips
        if (TripsAct[i]) {
          rowData["Places"] = TripsAct[i].places;
        }
        if (TripsAct[i]) {
          rowData["Trip_Date"] = TripsAct[i].date;
        }
        if (TripsAct[i]) {
          rowData["Number_of_Participants_Trips"] = TripsAct[i].nospasticipated;
        }
        if (TripsAct[i]) {
          rowData["Outcomes_Trips"] = TripsAct[i].outcomes;
        }

        // Social
        if (SocialAct[i]) {
          rowData["Social_platform"] = SocialAct[i].platform;
        }
        if (SocialAct[i]) {
          rowData["Social_Date"] = SocialAct[i].date;
        }
        if (SocialAct[i]) {
          rowData["Social_type_of_upload"] = SocialAct[i].typeofupload;
        }
        if (SocialAct[i]) {
          rowData["Social_reach"] = SocialAct[i].reach;
        }
        if (SocialAct[i]) {
          rowData["Social_likes"] = SocialAct[i].likes;
        }

        // Online
        if (OnlineAct[i]) {
          rowData["Program for"] = OnlineAct[i].progfor;
        }
        if (OnlineAct[i]) {
          rowData["Online_Program_Date"] = OnlineAct[i].date;
        }
        if (OnlineAct[i]) {
          rowData["Online_Program_topic"] = OnlineAct[i].topic;
        }
        if (OnlineAct[i]) {
          rowData["Online_Program_outcome"] = OnlineAct[i].outcome;
        }
        if (OnlineAct[i]) {
          rowData["Online_Program_no_participants"] = OnlineAct[i].noparti;
        }

        // School
        if (SchoolAct[i]) {
          rowData["Class_details"] = SchoolAct[i].classesdet;
        }
        if (SchoolAct[i]) {
          rowData["School_activities"] = SchoolAct[i].activities;
        }
        if (SchoolAct[i]) {
          rowData["School_outcome"] = SchoolAct[i].outcome;
        }

        csvData.push(rowData);
      }

      // Convert data to CSV format
      const csv = json2csv(csvData, { header: true });

      // Set response headers for file download
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=activities_report.csv"
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
