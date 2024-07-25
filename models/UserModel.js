// module.exports = (sequelize, DataTypes) => {
//   const UserModel = sequelize.define("User", {
//     userName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//   });

//   return UserModel;
// };


const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const userModel = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = userModel;