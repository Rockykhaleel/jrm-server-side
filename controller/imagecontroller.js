const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../Uploads"); // Path to Uploads folder
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create Uploads folder if not exists
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

module.exports = {
  image: async (req, res) => {
    try {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading
          console.error("Multer error:", err);
          return res.status(400).send({ message: "Error uploading image" });
        } else if (err) {
          // An unknown error occurred when uploading
          console.error("Unknown error:", err);
          return res.status(500).send({ message: "Internal Server Error" });
        }
        const File = req.file;
        // File uploaded successfully
        // console.log("File uploaded:", req.file);
        res.status(200).send({ message: "Image uploaded successfully", File });
      });
    } catch (error) {
      res.status(500).send({ message: "Some Internal Server Error" });
    }
  },
};
