const mongoose = require("mongoose");
const librarySchema = new mongoose.Schema(
  {
    numberofbooks: {
      type: String,
      required: true,
    },
    nameofbooks: {
      type: String,
      required: true,
    },
    avilability: {
      type: String,
      required: true,
    },
    facility: {
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

const Library = mongoose.model("Librarys", librarySchema);
module.exports = Library;
