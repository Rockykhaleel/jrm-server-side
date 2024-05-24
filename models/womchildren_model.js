const mongoose = require("mongoose");
const womenSchema = new mongoose.Schema(
  {
    programsconducted: {
      type: String,
      required: true,
    },
    nofwomchilassosi: {
      type: String,
      required: true,
    },
    outcomes: {
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

const Women = mongoose.model("Womens", womenSchema);
module.exports = Women;
