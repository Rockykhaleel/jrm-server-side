const mongoose = require("mongoose");
const socialSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    typeofupload: {
      type: String,
      required: true,
    },
    reach: {
      type: String,
      required: true,
    },
    likes: {
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

const Social = mongoose.model("social", socialSchema);
module.exports = Social;
