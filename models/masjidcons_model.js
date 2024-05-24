const mongoose = require("mongoose");
const masjidConsSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    etocompletion: {
      type: String,
      required: true,
    },
    facilities: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users", // This assumes you have a User model defined elsewhere
    },
  },
  { timestamps: true }
);

const MasjidCon = mongoose.model("MasjidCons", masjidConsSchema);
module.exports = MasjidCon;
