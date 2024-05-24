const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Users = require("../models/user_model");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  register: async (req, res) => {
    const { name, address, phone, email, password } = req.body;
    //Hash Password
    const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = new Users({
      name,
      email,
      password: hashedpassword,
      address,
      phone,
      role: "admin",
    });
    try {
      const resp = await newUser.save();
      res.status(201).send({ message: "User registered", resp });
    } catch (error) {
      res.status(500).send({ message: "Some Internal Server Error" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send("Username is not registered with US");
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
      res.status(200).json({ result: { token: jwtToken, user: payload } });
      // res
      //   .status(200)
      // .send({ message: "Login Successfull", jwt: jwtToken, payload });
    } else {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
  },
  //Get User By Its Id
  userByID: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Users.findById(id);
      res.status(200).json({
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    try {
      const resp = await Users.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "User Updated successfully",
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //only by Admin
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Users.findByIdAndDelete(id);
      // const user = await Users.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({
        message: "User deleted successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  profile: async (req, res) => {
    console.log(req.user);
    const date = new Date(req.user.iat * 1000);
    res.send({ messgae: "Profile page", user: req.user, date });
  },
  //only by Admin
  getAllUsers: async (req, res) => {
    try {
      const users = await Users.find({ role: "admin" }); //fetch data from Database
      // console.log(users);
      res.status(200).send({
        message: "All Users fetched successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
