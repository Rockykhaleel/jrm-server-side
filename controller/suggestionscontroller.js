const dotenv = require("dotenv");
dotenv.config();
const Suggestions = require("../models/suggestion_model");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  addsuggestions: async (req, res) => {
    const { userName, userId, suggestiondetails, suggestionActive } = req.body;
    const newCategories = new Suggestions({
      userName,
      userId,
      suggestiondetails,
      suggestionActive,
    });
    try {
      const resp = await newCategories.save();
      res.status(201).send({ message: "New suggestions Added", resp });
    } catch (error) {
      res.status(500).send({ message: "Some Internal Server Error" });
    }
  },
  //id
  updatesuggestions: async (req, res) => {
    const { id } = req.params;
    try {
      const resp = await Suggestions.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Suggestions Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //updateAllusing user id
  updateAllSuggestions: async (req, res) => {
    const { id } = req.params; // Assuming id is the user ID
    try {
      // Update all suggestions where userId matches the provided id
      const resp = await Suggestions.updateMany(
        { userId: id },
        { $set: { isNewReplyAdmin: false } }
      );

      res.status(200).json({
        message: "Suggestions Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //updateAllusing user id
  updateAllSuggestionsAd: async (req, res) => {
    const { id } = req.params; // Assuming id is the user ID
    try {
      // Update all suggestions where userId matches the provided id
      const resp = await Suggestions.updateMany({
        $set: { isNewReplyUser: false },
      });

      res.status(200).json({
        message: "Suggestions Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //send message main id
  //id
  sendMessage: async (req, res) => {
    const { id } = req.params;
    try {
      const {
        suggestionId,
        userId,
        userName,
        message,
        isNewReplyUsers,
        isNewReplyAdmins,
      } = req.body;
      const resp = await Suggestions.findByIdAndUpdate(id, {
        $push: {
          suggestionReply: { suggestionId, userName, message },
        },
        isNewReplyUser: isNewReplyUsers, // Set isNewReplyUser
        isNewReplyAdmin: isNewReplyAdmins,
      });
      res.status(200).json({
        message: "Message sent successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  getAllsuggestions: async (req, res) => {
    try {
      const product = await Suggestions.find(); //fetch data from Database
      res.status(200).json({
        message: "Suggestions fetched successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //id
  suggestionsByID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Suggestions.findById(id);
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Suggestions fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //Get User By Its Id
  //userId
  suggestionsByUserID: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Suggestions.find({ userId: new ObjectId(id) });
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Suggestions fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //userId & Active
  suggestionsByUserIDActive: async (req, res) => {
    const { id } = req.params;
    try {
      //   console.log("Received userId:", id); // Log the userId for debugging
      const user = await Suggestions.find({
        userId: new ObjectId(id),
        suggestionActive: true,
      });
      if (!user) {
        // console.log("User not found for userId:", id); // Log if user is not found
        return res.status(404).json({
          message: "User not found",
        });
      }
      //   console.log("Found user:", user); // Log the user data
      res.status(200).json({
        message: "Suggestions fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
