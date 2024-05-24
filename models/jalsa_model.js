const mongoose = require("mongoose");
const jalsaSchema = new mongoose.Schema(
  {
    meeladfund: {
      type: String,
      required: true,
    },
    meeladactivities: {
      type: String,
      required: true,
    },
    meeladexpenses: {
      type: String,
      required: true,
    },
    gyarahweenfund: {
      type: String,
      required: true,
    },
    gyarahweenactivities: {
      type: String,
      required: true,
    },
    gyarahweenexpenses: {
      type: String,
      required: true,
    },
    chattifund: {
      type: String,
      required: true,
    },
    chattiactivities: {
      type: String,
      required: true,
    },
    chattiexpenses: {
      type: String,
      required: true,
    },
    ursetajushariyafund: {
      type: String,
      required: true,
    },
    ursetajushariyaactivities: {
      type: String,
      required: true,
    },
    ursetajushariyaexpenses: {
      type: String,
      required: true,
    },
    urserazviyafund: {
      type: String,
      required: true,
    },
    urserazviyaactivities: {
      type: String,
      required: true,
    },
    urserazviyaexpenses: {
      type: String,
      required: true,
    },
    ursemuftieazamyafund: {
      type: String,
      required: true,
    },
    ursemuftieazamactivities: {
      type: String,
      required: true,
    },
    ursemuftieazamexpenses: {
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

const Jalsa = mongoose.model("Jalsas", jalsaSchema);
module.exports = Jalsa;
