require("dotenv").config();
const User = require("../../models/Users");
const bcrypt = require("bcrypt");

const UpdatePassword = async (req, res) => {
  try {
    const { old_password, new_password: plain_password } = req.body;
    if (!old_password) {
      return res.status(400).json({ message: "Input Old Password" });
    }
    if (!plain_password) {
      return res.status(400).json({ message: "Input New Password" });
    }
    const id = res.locals.id;
    const get_user = await User.findOne({ userid: id }).lean();
    if (!get_user) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    const bcompare = await bcrypt.compare(old_password, get_user.password);
    if (!bcompare) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    hashedpassword = await bcrypt.hash(plain_password, 10);
    const user_update = await User.updateOne(
      { userid: id },
      {
        $set: { password: hashedpassword },
      }
    );
    if (!user_update) {
      return res.status(400).json({ message: "Update failed" });
    }
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: "An error occured" });
  }
};

module.exports = { UpdatePassword };
