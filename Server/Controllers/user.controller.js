const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const nodemailer = require("nodemailer");

// Configure nodemailer transporter
// Ensure you have set up your environment variables for MAIL and MAIL_PASS
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

// User controller functions
const userController = {
  // Get all users
  getAll: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  },

  // Get a single user by ID
  getOne: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  },

  // Delete a user by ID
  delete: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  },
  // Register a new user
  register: async (req, res) => {
    try {
      const existingUserWithEmail = await User.findOne({
        where: { email: req.body.email },
      });
      if (existingUserWithEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const existingUserWithUsername = await User.findOne({
        where: { username: req.body.username },
      });
      if (existingUserWithUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create(req.body);
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const info = await transporter.sendMail({
        from: process.env.MAIL,
        to: newUser.email,
        subject: "Welcome to DOMCHAT",
        text: `Hello ${newUser.username}, welcome to DOMCHAT!`,
        html: `<h1>Hello ${newUser.username}</h1>
        <a href=${
          process.env.BASE_URL_SERVER + "/users/verify/" + token
        }>Verify your account!</a>`,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  },

  // Verify user account
  verify: async (req, res) => {
    try {
      console.log("Verification request received");
      const token = req.params.token;
      if (!token) {
        return res.status(400).json({ message: "Token is required" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(user.dataValues);
      user.verify = true;
      await user.save();
      res.status(200).json("Your account has been verified successfully!");
    } catch (error) {
      res.status(500).json({ message: "Error verifying user", error });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
      if (!user.verify) {
        return res.status(403).json({ message: "Account not verified" });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  }
};

module.exports = userController;
