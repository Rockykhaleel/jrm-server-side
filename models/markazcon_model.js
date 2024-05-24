const mongoose = require("mongoose");
const markazconSchema = new mongoose.Schema(
  {
    fundmeth: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    transferdto: {
      type: String,
      required: true,
    },
    purpose: {
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

const Markazcon = mongoose.model("markazcons", markazconSchema);
module.exports = Markazcon;
