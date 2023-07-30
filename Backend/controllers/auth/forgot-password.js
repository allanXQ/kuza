require("dotenv").config();
const User = require("../../models/Users");
const jwt = require("jsonwebtoken");
const nodeoutlook = require("nodejs-nodemailer-outlook");

const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "Email not found" });
    }
    const secret = process.env.JWT_SECRET + findUser.password;
    const payload = {
      id: findUser.userid,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const url = req.hostname + ": + process.env.PORT";
    const id = findUser.userid;
    const link = `https://${url}/reset-password/${id}/${token}`;

    nodeoutlook.sendEmail({
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      html: `<h3><b>Password Reset</b> </h3>
              <div>
                <p>We have received a request to reset your password.</p>
                <p>${link}</p>
                <p>This link expires in 15 minutes</p>
                <p>If this wasn't you contact the admin to suspend any current transactions until further notice.</p>
                </div>`,
      //text: 'This is text version!',
      onError: (e) => {
        console.log(e);
        return res.status(400).json({ message: "An error ocurred. Try again" });
      },
      onSuccess: (i) => {
        return res.status(200).json({
          message: "Password reset link sent to your email",
        });
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error ocurred. Try again" });
  }
};

module.exports = { ForgotPassword };
