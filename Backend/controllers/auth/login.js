require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Fill in all required values" });
    }
    if (!password) {
      return res.status(400).json({ message: "Fill in all required values" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email/password" });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      const accesstoken = jwt.sign(
        { id: user.userid, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const refreshtoken = jwt.sign(
        { id: user.userid, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "1d" }
      );
      await User.updateOne({ email }, { $set: { refreshtoken } });
      res.cookie("accesstoken", accesstoken, {
        httpOnly: true,
        // secure: true,
        maxAge: 1 * 60 * 60 * 1000,
      });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Successful login",
        access_token: accesstoken,
      });
    }
    res.status(401).json({ message: "Invalid email/password" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Request failed" });
  }
};

module.exports = { Login };
