require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");
const Messages = require("../../utils/messages");

const ResetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { id, token } = req.params;
    const getUser = await User.findOne({ userid: id });
    if (!getUser) {
      return res.status(400).json({ message: Messages.userNotFound });
    }
    if (!token) {
      return res.status(401).json({ message: Messages.invalidToken });
    }
    const secret = process.env.JWT_SECRET + getUser.password;
    let verify = jwt.verify(token, secret);
    if (!verify) {
      return res.status(403).json({ message: Messages.invalidToken });
    }
    hashedpassword = await bcrypt.hash(password, 10);
    const userUpdate = await User.updateOne(
      { id },
      {
        $set: { password: hashedpassword },
      }
    );
    if (userUpdate.nModified === 0) {
      return res.status(400).json({ message: Messages.requestFailed });
    }
    res.status(200).json({ message: Messages.requestSuccessful });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: Messages.serverError });
  }
};

module.exports = { ResetPassword };
