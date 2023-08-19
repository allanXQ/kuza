const getGoogleAuthTokens = require("../../utils/getGoogleAuthTokens");
require("dotenv").config();

const googleOAuth = async (req, res) => {
  try {
    const code = req.query.code;
    const { id_token, access_token } = await getGoogleAuthTokens(code);
    console.log({ id: id_token, access: access_token });
  } catch (error) {
    console.log(error);
    return res.redirect(`${process.env.CLIENT_URL}/login`);
  }
};

module.exports = { googleOAuth };
