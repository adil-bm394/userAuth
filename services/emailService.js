const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("email=>", process.env.mail, "check password=>", process.env.pass);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mail,
    pass: process.env.pass,
  },
});

const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: "adil@binmile.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
