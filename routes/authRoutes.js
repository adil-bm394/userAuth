const express = require("express");
const {
  registerController,
  loginController,
  sendOtpController,
} = require("../controllers/authController");

const {
  validateOtpRequest,
  validateRegisterRequest,
  validateLoginRequest,
} = require("../Utils/ValidationSchema");
const router = express.Router();


// Send OTP to user
router.post("/send-otp", validateOtpRequest, sendOtpController);

// Register
router.post("/register", validateRegisterRequest, registerController);

// Login
router.get("/login", validateLoginRequest,loginController);

module.exports = router;
