const mongoose = require("mongoose");
const competionsSchema = new mongoose.Schema(
  {
    tyocompetion: {
      type: String,
      required: true,
    },
    dateorganized: {
      type: String,
      required: true,
    },
    nospasticipated: {
      type: String,
      required: true,
    },
    winners: {
      type: String,
      required: true,
    },
    prizes: {
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

const Competions = mongoose.model("competions", competionsSchema);
module.exports = Competions;
