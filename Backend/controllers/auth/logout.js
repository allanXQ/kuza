const User = require("../../models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cleartokens = (res) => {
  res.cookie("accessToken", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.cookie("refreshToken", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

const Logout = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    // Assuming you have a User model and each User has a refreshToken field
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findOne({
      userid: verify.id,
    });
    if (!user) {
      cleartokens(res);
      return res.status(401).json({ message: "Logged out" });
    }
    // Invalidate the refresh token
    user.refreshToken = null;
    await user.save();
    // Clear the cookies
    cleartokens(res);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    cleartokens(res);
    res.status(500).json({ message: "Logged out" });
  }
};

module.exports = { Logout };
