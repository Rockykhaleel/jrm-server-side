const mongoose = require("mongoose");
const darululoomSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    places: {
      type: String,
      required: true,
    },
    nofstudents: {
      type: String,
      required: true,
    },
    facilityprovided: {
      type: String,
      required: true,
    },
    mudarrisdetails: {
      type: String,
      required: true,
    },
    coursesavailable: {
      type: String,
      required: true,
    },
    dastabandidetails: {
      type: String,
      required: true,
    },
    noftalabafarig: {
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

const Darululoom = mongoose.model("Darululooms", darululoomSchema);
module.exports = Darululoom;
