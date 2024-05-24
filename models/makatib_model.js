const mongoose = require("mongoose");
const makatibSchema = new mongoose.Schema(
  {
    nofmakatib: {
      type: Number,
      required: true,
    },
    makatibname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    stupmakatib: {
      type: Number,
      required: true,
    },
    mudarrisdetails: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    booksdist: {
      type: String,
      required: true,
    },
    expensesdet: {
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

const Makatib = mongoose.model("Makatibs", makatibSchema);
module.exports = Makatib;
