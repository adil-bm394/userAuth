const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  mail: process.env.mail,
  pass: process.env.pass,
};
