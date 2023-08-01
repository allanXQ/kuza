const router = require("express").Router();
const { UpdatePassword } = require("../../controllers/account/updatepassword");
const { Login } = require("../../controllers/auth/login");
const { Register } = require("../../controllers/auth/register");
const { ResetPassword } = require("../../controllers/auth/reset-password");
const { verifyjwt } = require("../../middleware/verifyjwt");
const { ForgotPassword } = require("../../controllers/auth/forgot-password");
const { RefreshToken } = require("../../controllers/auth/refreshjwt");
const { Logout } = require("../../controllers/auth/logout");
const formValidate = require("../../middleware/validate");
const {
  regSchema,
  loginSchema,
  updatePasswordSchema,
  forgotPasswordSchema,
} = require("../../yupschemas");

router.post("/auth/register", formValidate(regSchema), Register);
router.post("/auth/login", formValidate(loginSchema), Login);
router.post("/auth/reset_password/:id/:token", ResetPassword);
router.post("/auth/refresh_token", RefreshToken);
router.post("/auth/logout", Logout);

router.post(
  "/auth/forgot_password",
  formValidate(forgotPasswordSchema),
  ForgotPassword
);
router.post(
  "/update_password",
  verifyjwt,
  formValidate(updatePasswordSchema),
  UpdatePassword
);

module.exports = router;
