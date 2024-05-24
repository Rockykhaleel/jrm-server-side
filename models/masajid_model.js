const mongoose = require("mongoose");
const masajidSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    places: {
      type: String,
      required: true,
    },
    workpro: {
      type: String,
      required: true,
    },
    activities: {
      type: String,
      required: true,
    },
    fundsraised: {
      type: String,
      required: true,
    },
    masajidman: {
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

const Masajid = mongoose.model("Masajids", masajidSchema);
module.exports = Masajid;
