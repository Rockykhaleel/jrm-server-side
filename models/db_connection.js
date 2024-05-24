//DB Connections
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.connection_string)
  .then(() => console.log("Connected to db...!!!"))
  .catch((err) => {
    console.log("Error Occured ", err);
  });

// const Product = require("./product");
const User = require("./user_model");
