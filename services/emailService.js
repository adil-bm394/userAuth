const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adil@binmile.com",
    pass: "lwortvygdwcsaube",
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
