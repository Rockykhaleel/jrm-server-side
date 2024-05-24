const mongoose = require("mongoose");
const ulamaSchema = new mongoose.Schema(
  {
    ulamaname: {
      type: String,
      required: true,
    },
    ulamaposition: {
      type: String,
      required: true,
    },
    ulamacontact: {
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

const Ulama = mongoose.model("Ulamas", ulamaSchema);
module.exports = Ulama;
