const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/Users");

const RefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const FindJwt = User.findOne({ refreshToken });

    if (!FindJwt) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    verify = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    if (!verify) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const accessToken = jwt.sign(
      { id: verify.id, role: verify.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const newRefreshToken = jwt.sign(
      { id: verify.id, role: verify.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      // secure: true,
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/api/auth/refresh_token",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.locals.id = verify.id;
    await User.updateOne(
      { refreshToken },
      { $set: { refreshToken: newRefreshToken } }
    );
    return res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { RefreshToken };
