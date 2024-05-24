const mongoose = require("mongoose");
const suggestionsSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users", // This assumes you have a User model defined elsewhere
    },
    suggestiondetails: {
      type: Object,
      required: true,
    },
    suggestionActive: {
      type: Boolean,
      required: true,
    },
    suggestionReply: {
      type: Array,
      required: false,
    },
    isNewReplyUser: {
      type: Boolean,
      required: false,
    },
    isNewReplyAdmin: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const Suggestions = mongoose.model("suggestions", suggestionsSchema);
module.exports = Suggestions;
