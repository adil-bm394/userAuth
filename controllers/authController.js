const { models } = require("../models/index");
const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");


//RegisterController
const registerController = async (req, res) => {
  const { username, password, email } = req.body;
console.log(username,password,email);
  try {
    const existingUser = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User ALready exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
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
  registerController,
  loginController,
};
