const mongoose = require("mongoose");
const onlineSchema = new mongoose.Schema(
  {
    progfor: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    nohours: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    noparti: {
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

const Online = mongoose.model("onlines", onlineSchema);
module.exports = Online;
