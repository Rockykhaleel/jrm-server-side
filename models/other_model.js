const mongoose = require("mongoose");
const otherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    docomple: {
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

const Other = mongoose.model("others", otherSchema);
module.exports = Other;
