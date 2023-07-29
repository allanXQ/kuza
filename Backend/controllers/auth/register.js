const uuid = require("uuid");
const User = require("../../models/Users");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  const {
    username,
    email,
    referrer,
    phone,
    password: plain_password,
  } = req.body;
  const id = uuid.v4();

  try {
    const find_username = await User.findOne({ username });
    const find_phone = await User.findOne({ phone });
    const find_email = await User.findOne({ email });
    if (find_username) {
      return res.status(400).json({ message: "Invalid username" });
    }
    if (find_email) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (find_phone) {
      return res.status(400).json({ message: "Invalid phone_number" });
    }
    const password = await bcrypt.hash(plain_password, 10);
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
