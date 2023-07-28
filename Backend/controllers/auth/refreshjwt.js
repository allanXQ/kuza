const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/Users");

const refreshtoken = async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    if (!refreshtoken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const FindJwt = User.findOne({ refreshtoken });

    if (!FindJwt) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    verify = jwt.verify(refreshtoken, process.env.REFRESH_SECRET);
    if (!verify) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const accesstoken = jwt.sign(
      { id: verify.id, role: verify.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const newrefreshtoken = jwt.sign(
      { id: verify.id, role: verify.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("accesstoken", accesstoken, {
      httpOnly: true,
      // secure: true,
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.cookie("refreshtoken", newrefreshtoken, {
      httpOnly: true,
      path: "/api/auth/refresh_token",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.locals.id = verify.id;
    await User.updateOne(
      { refreshtoken },
      { $set: { refreshtoken: newrefreshtoken } }
    );
    return res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { refreshtoken };
