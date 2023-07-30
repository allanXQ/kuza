require("dotenv").config();
const User = require("../../models/Users");
const bcrypt = require("bcrypt");

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword: plainPassword } = req.body;
    if (!oldPassword) {
      return res.status(400).json({ message: "Input Old Password" });
    }
    if (!plainPassword) {
      return res.status(400).json({ message: "Input New Password" });
    }
    const id = res.locals.id;
    const getUser = await User.findOne({ userid: id });
    if (!getUser) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    const bcompare = await bcrypt.compare(oldPassword, getUser.password);
    if (!bcompare) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    hashedPassword = await bcrypt.hash(plainPassword, 10);
    const userUpdate = await User.updateOne(
      { userid: id },
      {
        $set: { password: hashedPassword },
      }
    );
    if (!userUpdate) {
      return res.status(400).json({ message: "Update failed" });
    }
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: "An error occured" });
  }
};

module.exports = { UpdatePassword };
