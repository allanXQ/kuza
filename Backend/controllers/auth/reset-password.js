require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");

const ResetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { id, token } = req.params;
    const get_user = await User.findOne({ userid: id });
    if (!get_user) {
      return res.status(400).json({ message: "invalid user" });
    }
    if (!token) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const secret = process.env.JWT_SECRET + get_user.password;
    let verify = jwt.verify(token, secret);
    if (!verify) {
      return res.status(403).json({ message: "Forbidden" });
    }
    hashedpassword = await bcrypt.hash(password, 10);
    const user_update = await User.updateOne(
      { id },
      {
        $set: { password: hashedpassword },
      }
    );
    if (!user_update) {
      return res.status(400).json({ message: "Update failed" });
    }
    res.status(200).json({ message: "update successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "request failed" });
  }
};

module.exports = { ResetPassword };
