const mongoose = require("mongoose");
const meetingSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    discussion: {
      type: String,
      required: true,
    },
    mimeeting: {
      type: String,
      required: true,
    },
    advices: {
      type: String,
      required: true,
    },
    outcomes: {
      type: String,
      required: true,
    },

    dateofmeeting: {
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

const Meeting = mongoose.model("Meetings", meetingSchema);
module.exports = Meeting;
