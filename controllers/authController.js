const { models } = require("../models/index");
const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");
const crypto = require("crypto");
const sendOtpEmail = require("../services/emailService");
const OtpModel = require("../models/OtpModel");
const statusCodes = require("../Utils/statusCodes");
const messages = require("../Utils/messages");

//Send-OTP controller
const sendOtpController = async (req, res) => {
  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    await OtpModel.create({ email, otp });
    await sendOtpEmail(email, otp);
    res.status(statusCodes.OK).json({ message: messages.OTP_SENT });
  } catch (error) {
    console.log(error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
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
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: messages.OTP_INVALID });
    }

    const otpAgeMinutes =
      (new Date() - new Date(otpRecord.createdAt)) / (1000 * 60);
    if (otpAgeMinutes > 5) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: messages.OTP_EXPIRED });
    }

    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(statusCodes.OK)
        .json({ success: false, message: messages.USER_EXISTS });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    await OtpModel.destroy({ where: { email } });

    res
      .status(statusCodes.CREATED)
      .json({ message: messages.REGISTER_SUCCESS, user: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

//Login Controller
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: messages.USER_NOT_FOUND });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: messages.INVALID_CREDENTIALS });
    }

    res.status(statusCodes.OK).json({ message: messages.LOGIN_SUCCESS, user });
  } catch (error) {
    console.log(error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  sendOtpController,
  registerController,
  loginController,
};
