const { models } = require("../models/index");
const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");
const crypto = require("crypto");
const sendOtpEmail = require("../services/emailService");
const OtpModel = require("../models/OtpModel");

const otps = new Map(); 

// Generate OTP and send email to User
const sendOtpController = async (req, res) => {
  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    // Store OTP in the OTP table
    await OtpModel.create({ email, otp });

    await sendOtpEmail(email, otp);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//RegisterController
const registerController = async (req, res) => {
  const { username, password, email, otp } = req.body;

  try {
    const otpRecord = await OtpModel.findOne({
      where: { email },
      order: [["createdAt", "DESC"]],
    });

    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    
    const otpAgeMinutes =
      (new Date() - new Date(otpRecord.createdAt)) / (1000 * 60);
    if (otpAgeMinutes > 5) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(200)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    await OtpModel.destroy({ where: { email } });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


//LoginController
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendOtpController,
  registerController,
  loginController,
};























