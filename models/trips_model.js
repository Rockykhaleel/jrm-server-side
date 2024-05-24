const mongoose = require("mongoose");
const tripsSchema = new mongoose.Schema(
  {
    places: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    nospasticipated: {
      type: String,
      required: true,
    },
    outcomes: {
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

const Trips = mongoose.model("trips", tripsSchema);
module.exports = Trips;
