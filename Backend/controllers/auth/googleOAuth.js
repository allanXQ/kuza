const getGoogleAuthTokens = require("../../utils/getGoogleAuthTokens");
require("dotenv").config();
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const { generateTokens } = require("../../utils/cookie");
const Messages = require("../../utils/messages");

const id = uuid.v4();

const UserSuccess = async (findUser) => {
  const tokens = generateTokens(findUser);
  const userUpdate = await User.updateOne(
    { email },
    { $set: { refreshToken: tokens.refreshToken } }
  );
  if (userUpdate.nModified === 0) {
    return res.status(400).json({ message: Messages.loginFailed });
  }
  setCookies(res, tokens);
  return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};

const googleOAuth = async (req, res) => {
  try {
    const code = req.query.code;
    const { id_token, access_token } = await getGoogleAuthTokens(code);
    const { email, name } = jwt.decode(id_token);
    const findUser = await User.findOne({ email });
    if (findUser) UserSuccess(findUser);
    const firstname = name.split(" ")[0];
    const lastname = name.split(" ")[1];
    const createUser = await User.create({
      userid: id,
      email,
      firstname,
      lastname,
      authMethod: "google",
    });
    if (!createUser) {
      return res.status(400).json({ message: Messages.loginFailed });
    }
    UserSuccess(createUser);
  } catch (error) {
    console.log(error);
    return res.redirect(`${process.env.CLIENT_URL}/login`, {
      message: Messages.serverError,
    });
  }
};

module.exports = { googleOAuth };
