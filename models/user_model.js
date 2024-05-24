const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    memberscount: {
      type: Number,
      required: false,
    },
    designation: {
      type: String,
      required: false,
    },
    account: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"], // Specify the allowed roles
      default: "admin", // Set a default role if needed
    },
  },
  { timestamps: true }
);
const User = mongoose.model("Users", userSchema);
module.exports = User;
