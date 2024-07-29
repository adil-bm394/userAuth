const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fakeDatabase", "adil", "adil@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
