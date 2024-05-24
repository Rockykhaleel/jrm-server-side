const mongoose = require("mongoose");
const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    noteachers: {
      type: String,
      required: true,
    },
    nostudents: {
      type: String,
      required: true,
    },
    classesdet: {
      type: String,
      required: true,
    },
    facility: {
      type: String,
      required: true,
    },
    feestruct: {
      type: String,
      required: true,
    },
    activities: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    expenses: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users", // This assumes you have a User model defined elsewhere
    },
  },
  { timestamps: true }
);

const School = mongoose.model("schools", schoolSchema);
module.exports = School;
