const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyjwt = (req, res, next) => {
  try {
    const { accesstoken } = req.cookies;
    if (!accesstoken) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    verify = jwt.verify(accesstoken, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    res.locals.id = verify.id;
    //console.log(verify)
  } catch (error) {
    return res.status(403).json({ message: "An Error Occurred" });
  }

  next();
};

module.exports = { verifyjwt };
