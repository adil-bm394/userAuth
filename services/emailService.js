const nodemailer = require("nodemailer");
const getOtpEmailTemplate = require("./EmailTemplate");
require("dotenv").config();

//console.log("email=>", process.env.mail, "check password=>", process.env.pass);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mail,
    pass: process.env.pass,
  },
});

const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.mail,
    to: email,
    subject: "Your OTP Code",
    html: getOtpEmailTemplate(email, otp),
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
