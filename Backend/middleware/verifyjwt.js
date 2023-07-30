const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyjwt = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    verify = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    res.locals.id = verify.id;
    //console.log(verify)
    next();
  } catch (error) {
    return res.status(403).json({ message: "An Error Occurred" });
  }
};

module.exports = { verifyjwt };
