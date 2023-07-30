const uuid = require("uuid");
const User = require("../../models/Users");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  const {
    username,
    email,
    referrer,
    phone,
    password: plainPassword,
  } = req.body;
  const id = uuid.v4();

  try {
    const getUser = await User.findOne({ username });
    const getPhone = await User.findOne({ phone });
    const getEmail = await User.findOne({ email });
    if (getUser) {
      return res.status(400).json({ message: "Invalid username" });
    }
    if (getEmail) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (getPhone) {
      return res.status(400).json({ message: "Invalid phoneNumber" });
    }
    const password = await bcrypt.hash(plainPassword, 10);
    await User.create({
      userid: id,
      username,
      email,
      phone,
      referrer,
      password,
    });
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating user! Try again" });
  }
};

module.exports = { Register };
